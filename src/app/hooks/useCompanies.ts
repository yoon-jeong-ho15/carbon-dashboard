import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchCompanies } from "../lib/api";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
}

// 각 회사별 종합 분석 데이터
export function useCompanyAnalysis() {
  const { data: companies, ...rest } = useCompanies();

  const companyAnalysis = useMemo(() => {
    if (!companies) return [];

    return companies.map((company) => {
      // 총 배출량
      const totalEmissions = company.emissions.reduce((sum, emission) => sum + emission.emissions, 0);

      // 연도별 그룹핑
      const yearlyData: Record<string, number> = {};
      company.emissions.forEach((emission) => {
        const year = emission.yearMonth.split('-')[0];
        yearlyData[year] = (yearlyData[year] || 0) + emission.emissions;
      });

      // 월별 데이터 (yearMonth를 키로)
      const monthlyData: Record<string, number> = {};
      company.emissions.forEach((emission) => {
        monthlyData[emission.yearMonth] = (monthlyData[emission.yearMonth] || 0) + emission.emissions;
      });

      // 소스별 데이터
      const sourceData: Record<string, number> = {};
      company.emissions.forEach((emission) => {
        sourceData[emission.source] = (sourceData[emission.source] || 0) + emission.emissions;
      });

      // 월 평균 (전체 기간 대비)
      const totalMonths = Object.keys(monthlyData).length;
      const monthlyAverage = totalMonths > 0 ? totalEmissions / totalMonths : 0;

      // 연간 배출량 배열 (년도별)
      const annualEmissions = Object.entries(yearlyData).map(([year, emissions]) => ({
        year,
        emissions
      })).sort((a, b) => a.year.localeCompare(b.year));

      // 월간 배출량 배열 (월별, 정렬됨)
      const monthlyEmissions = Object.entries(monthlyData).map(([yearMonth, emissions]) => ({
        yearMonth,
        emissions
      })).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

      // 소스별 배출량 배열 (배출량 내림차순)
      const sourceEmissions = Object.entries(sourceData).map(([source, emissions]) => ({
        source,
        emissions
      })).sort((a, b) => b.emissions - a.emissions);

      return {
        id: company.id,
        name: company.name,
        country: company.country,
        totalEmissions,
        monthlyAverage,
        annualEmissions,
        monthlyEmissions,
        sourceEmissions,
        // 추가 유용한 정보들
        recordCount: company.emissions.length,
        yearsActive: Object.keys(yearlyData).length,
        sourcesUsed: Object.keys(sourceData).length,
      };
    });
  }, [companies]);

  return {
    companyAnalysis,
    companies,
    ...rest,
  };
}

// 특정 회사의 상세 분석 데이터
export function useCompanyDetails(companyId: string) {
  const { companyAnalysis, ...rest } = useCompanyAnalysis();

  const companyDetails = useMemo(() => {
    if (!companyAnalysis || !companyId) return null;
    return companyAnalysis.find(company => company.id === companyId);
  }, [companyAnalysis, companyId]);

  return {
    companyDetails,
    companyAnalysis,
    ...rest,
  };
}

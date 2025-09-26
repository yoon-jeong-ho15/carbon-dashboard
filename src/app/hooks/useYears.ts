import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchCompanies } from "../lib/api";

export function useYears() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 연도별 종합 분석 데이터
export function useYearlyAnalysis() {
  const { data: companies, ...rest } = useYears();

  const yearlyAnalysis = useMemo(() => {
    if (!companies) return [];

    // 모든 배출 데이터를 연도별로 그룹화
    const yearlyData: Record<
      string,
      {
        totalEmissions: number;
        companies: Set<string>;
        sources: Record<string, number>;
        months: Record<string, number>;
        companyEmissions: Record<string, number>;
      }
    > = {};

    companies.forEach((company) => {
      company.emissions.forEach((emission) => {
        const year = emission.yearMonth.split("-")[0];

        if (!yearlyData[year]) {
          yearlyData[year] = {
            totalEmissions: 0,
            companies: new Set(),
            sources: {},
            months: {},
            companyEmissions: {},
          };
        }

        const yearData = yearlyData[year];
        yearData.totalEmissions += emission.emissions;
        yearData.companies.add(company.id);
        yearData.sources[emission.source] =
          (yearData.sources[emission.source] || 0) + emission.emissions;
        yearData.months[emission.yearMonth] =
          (yearData.months[emission.yearMonth] || 0) + emission.emissions;
        yearData.companyEmissions[company.id] =
          (yearData.companyEmissions[company.id] || 0) + emission.emissions;
      });
    });

    // 분석 결과를 배열로 변환
    return Object.entries(yearlyData)
      .map(([year, data]) => {
        // 월별 배출량 배열
        const monthlyEmissions = Object.entries(data.months)
          .filter(([yearMonth]) => yearMonth.startsWith(year))
          .map(([yearMonth, emissions]) => ({
            month: yearMonth.split("-")[1],
            yearMonth,
            emissions,
          }))
          .sort((a, b) => a.month.localeCompare(b.month));

        // 소스별 배출량 배열
        const sourceEmissions = Object.entries(data.sources)
          .map(([source, emissions]) => ({
            source,
            emissions,
          }))
          .sort((a, b) => b.emissions - a.emissions);

        // 회사별 배출량 배열
        const companyEmissions = Object.entries(data.companyEmissions)
          .map(([companyId, emissions]) => {
            const company = companies.find((c) => c.id === companyId);
            return {
              companyId,
              companyName: company?.name || "Unknown",
              country: company?.country || "Unknown",
              emissions,
            };
          })
          .sort((a, b) => b.emissions - a.emissions);

        // 월별 평균
        const monthlyAverage =
          monthlyEmissions.length > 0
            ? Math.floor(data.totalEmissions / monthlyEmissions.length)
            : 0;

        return {
          year,
          totalEmissions: data.totalEmissions,
          companyCount: data.companies.size,
          monthlyAverage,
          monthlyEmissions,
          sourceEmissions,
          companyEmissions,
          sourcesUsed: Object.keys(data.sources).length,
          activeMonths: monthlyEmissions.length,
        };
      })
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [companies]);

  return {
    yearlyAnalysis,
    companies,
    ...rest,
  };
}

// 특정 연도의 상세 분석 데이터
export function useYearDetails(year: string) {
  const { yearlyAnalysis, ...rest } = useYearlyAnalysis();

  const yearDetails = useMemo(() => {
    if (!yearlyAnalysis || !year) return null;
    return yearlyAnalysis.find((y) => y.year === year);
  }, [yearlyAnalysis, year]);

  return {
    yearDetails,
    yearlyAnalysis,
    ...rest,
  };
}

// 연도 비교 분석
export function useYearComparison(year1: string, year2: string) {
  const { yearlyAnalysis, ...rest } = useYearlyAnalysis();

  const comparison = useMemo(() => {
    if (!yearlyAnalysis || !year1 || !year2) return null;

    const y1Data = yearlyAnalysis.find((y) => y.year === year1);
    const y2Data = yearlyAnalysis.find((y) => y.year === year2);

    if (!y1Data || !y2Data) return null;

    const emissionsDiff = y2Data.totalEmissions - y1Data.totalEmissions;
    const emissionsChangePercent =
      y1Data.totalEmissions > 0
        ? (emissionsDiff / y1Data.totalEmissions) * 100
        : 0;

    const companyCountDiff = y2Data.companyCount - y1Data.companyCount;

    return {
      year1: y1Data,
      year2: y2Data,
      emissionsDiff,
      emissionsChangePercent,
      companyCountDiff,
      isImproving: emissionsDiff < 0, // 배출량이 감소했으면 개선
    };
  }, [yearlyAnalysis, year1, year2]);

  return {
    comparison,
    yearlyAnalysis,
    ...rest,
  };
}

// 특정 연도의 회사별 월별 배출량 데이터
export function useYearCompanyMonthlyData(year: string) {
  const { data: companies, ...rest } = useYears();

  const monthlyCompanyData = useMemo(() => {
    if (!companies || !year) return null;

    // 해당 연도에 배출 데이터가 있는 회사들 필터링
    const activeCompanies = companies.filter((company) =>
      company.emissions.some((emission) => emission.yearMonth.startsWith(year))
    );

    // 12개월 데이터 구조 초기화
    const monthlyData: Record<string, any> = {};
    for (let month = 1; month <= 12; month++) {
      monthlyData[month.toString()] = { month: month.toString() };
    }

    // 각 회사별로 월별 데이터 추가
    activeCompanies.forEach((company) => {
      company.emissions
        .filter((emission) => emission.yearMonth.startsWith(year))
        .forEach((emission) => {
          const month = parseInt(emission.yearMonth.split("-")[1]).toString();
          if (!monthlyData[month][company.name]) {
            monthlyData[month][company.name] = 0;
          }
          monthlyData[month][company.name] += emission.emissions;
        });
    });

    // 배열로 변환하고 월 순서로 정렬
    const combinedData = Object.values(monthlyData).sort(
      (a, b) => parseInt(a.month) - parseInt(b.month)
    );

    return {
      combinedData,
      activeCompanies,
      companyNames: activeCompanies.map((c) => c.name),
      companyIds: activeCompanies.map((c) => c.id),
    };
  }, [companies, year]);

  return {
    monthlyCompanyData,
    companies,
    ...rest,
  };
}

// Overview 페이지를 위한 종합 데이터
export function useOverviewData() {
  const { data: companies, ...rest } = useYears();

  const overviewData = useMemo(() => {
    if (!companies) return null;

    // 현재 날짜 기준으로 최근 12개월 계산
    const now = new Date();
    const recentMonths: string[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - 1 - i, 1);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      recentMonths.push(yearMonth);
    }

    // 1) 최근 12개월 월별 배출량 (전체 회사)
    const recentMonthlyEmissions = recentMonths.map((yearMonth) => {
      const totalEmissions = companies.reduce((sum, company) => {
        const monthData = company.emissions
          .filter((e) => e.yearMonth === yearMonth)
          .reduce((monthSum, e) => monthSum + e.emissions, 0);
        return sum + monthData;
      }, 0);

      return {
        yearMonth,
        month: yearMonth.split("-")[1],
        year: yearMonth.split("-")[0],
        emissions: totalEmissions,
      };
    });

    // 2) 회사별 전체기간 배출량 총합
    const companyTotalEmissions = companies
      .map((company) => {
        const totalEmissions = company.emissions.reduce(
          (sum, e) => sum + e.emissions,
          0
        );
        return {
          id: company.id,
          name: company.name,
          country: company.country,
          totalEmissions,
        };
      })
      .sort((a, b) => b.totalEmissions - a.totalEmissions);

    // 3) 국가별 전체기간 배출량 총합
    const countryEmissions: Record<string, number> = {};
    companies.forEach((company) => {
      const companyTotal = company.emissions.reduce(
        (sum, e) => sum + e.emissions,
        0
      );
      countryEmissions[company.country] =
        (countryEmissions[company.country] || 0) + companyTotal;
    });

    const countryTotalEmissions = Object.entries(countryEmissions)
      .map(([country, emissions]) => ({
        country,
        emissions,
      }))
      .sort((a, b) => b.emissions - a.emissions);

    // 4) 소스별 전체기간 배출량 총합
    const sourceEmissions: Record<string, number> = {};
    companies.forEach((company) => {
      company.emissions.forEach((emission) => {
        sourceEmissions[emission.source] =
          (sourceEmissions[emission.source] || 0) + emission.emissions;
      });
    });

    const sourceTotalEmissions = Object.entries(sourceEmissions)
      .map(([source, emissions]) => ({
        source,
        emissions,
      }))
      .sort((a, b) => b.emissions - a.emissions);

    // 전체 통계
    const totalEmissions = companies.reduce(
      (sum, company) =>
        sum +
        company.emissions.reduce(
          (companySum, e) => companySum + e.emissions,
          0
        ),
      0
    );

    const totalCompanies = companies.length;
    const totalCountries = Object.keys(countryEmissions).length;
    const totalSources = Object.keys(sourceEmissions).length;

    return {
      // 최근 12개월 데이터
      recentMonthlyEmissions,
      recentMonths,

      // 분류별 총합
      companyTotalEmissions,
      countryTotalEmissions,
      sourceTotalEmissions,

      // 전체 통계
      totalEmissions,
      totalCompanies,
      totalCountries,
      totalSources,

      // 평균
      averageEmissionsPerCompany:
        totalCompanies > 0 ? totalEmissions / totalCompanies : 0,
      averageEmissionsPerMonth:
        recentMonthlyEmissions.length > 0
          ? recentMonthlyEmissions.reduce((sum, m) => sum + m.emissions, 0) /
            recentMonthlyEmissions.length
          : 0,
    };
  }, [companies]);

  return {
    overviewData,
    companies,
    ...rest,
  };
}

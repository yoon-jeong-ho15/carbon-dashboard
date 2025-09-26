"use client";

import { useState } from "react";
import CompanyInfoCard, { CompanySummary } from "./company/c-info-card";
import { useCompanyAnalysis } from "@/app/hooks/useCompanies";
import { Company } from "@/app/lib/type";
import CompanyInfoChart from "./company/c-charts";
import CompanySourceChart from "./company/c-source";

export default function CompanyAnalytics() {
  const { companyAnalysis, isLoading, error } = useCompanyAnalysis();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);

  return (
    <div className="p-6 flex flex-col">
      <div className="flex gap-4 items-center mb-4">
        <span className="text-sm font-medium">Companies:</span>
        <div className="flex gap-1">
          <div className="border-r pr-2 mr-2 border-gray-500">
            <button
              onClick={() => {
                if (selectedCompanyIds.length === companyAnalysis?.length) {
                  setSelectedCompanyIds([]);
                } else {
                  setSelectedCompanyIds(
                    companyAnalysis?.map((c) => c.id) || []
                  );
                }
              }}
              className={`px-3 py-1 text-sm transition-all ${
                selectedCompanyIds.length === companyAnalysis?.length
                  ? "bg-blue-500 text-white rounded-sm"
                  : "bg-gray-300 hover:bg-gray-300 rounded-xl"
              }`}
            >
              Select All
            </button>
          </div>
          {companyAnalysis?.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                setSelectedCompanyIds((prev) =>
                  prev.includes(company.id)
                    ? prev.filter((id) => id !== company.id)
                    : [...prev, company.id]
                );
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCompanyIds.includes(company.id)
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <div>Loading companies...</div>}
      {error && <div>Error: {error.message}</div>}
      {selectedCompanyIds.length < 1 && <div>Select companies</div>}

      <div className="grid grid-cols-2 gap-2">
        {selectedCompanyIds.map((companyId) => {
          const company = companyAnalysis?.find((c) => c.id === companyId);
          if (!company) return null;

          return (
            <div key={company.id} className="space-y-4 my-4">
              <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded p-2">
                {/* 회사 기본 정보 */}
                <div className="p-3 bg-white rounded">
                  <h3 className="font-bold">{company.name}</h3>
                </div>

                {/* 국가 */}
                <CompanyInfoCard type="country" value={company.country} />

                {/* 평점 */}
                <CompanyInfoCard
                  className="col-span-2"
                  type="overall"
                  value={Math.round(company.totalEmissions)}
                />

                {/* 총 배출량 */}
                <CompanyInfoCard
                  type="total"
                  value={Math.round(company.totalEmissions)}
                />

                {/* 월 평균 */}
                <CompanyInfoCard
                  type="average"
                  value={Math.round(company.monthlyAverage)}
                />

                {/* 연간 배출 점유율 */}
                <CompanyInfoChart
                  className="col-span-2"
                  type="ratio-trend"
                  data={(() => {
                    const recentEmissions = company.annualEmissions.slice(-3);
                    const totalAnnual = recentEmissions.reduce(
                      (sum, item) => sum + item.emissions,
                      0
                    );

                    return recentEmissions.map((item) => ({
                      year: parseInt(item.year),
                      ratio:
                        totalAnnual > 0
                          ? parseFloat(
                              ((item.emissions / totalAnnual) * 100).toFixed(1)
                            )
                          : 0,
                    }));
                  })()}
                />

                {/* 월별 트렌드 */}
                <CompanyInfoChart
                  className="col-span-3"
                  type="trend"
                  data={company.monthlyEmissions.map((item) => ({
                    month: item.yearMonth,
                    emissions: item.emissions,
                  }))}
                />

                {/* 소스별 분석 */}
                <CompanySourceChart
                  className="col-span-1"
                  data={company.sourceEmissions.map((item) => ({
                    name: item.source,
                    value: item.emissions,
                  }))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

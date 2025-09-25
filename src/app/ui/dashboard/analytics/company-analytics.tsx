"use client";

import { useState } from "react";
import CompanyInfoCard, {
  CompanyInfoChart,
  CompanySummary,
} from "./company/company-info-card";

export default function CompanyAnalytics() {
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);

  return (
    <div className="p-6 flex flex-col">
      <div className="flex gap-4 items-center mb-4">
        <span className="text-sm font-medium">Companies:</span>
        <div className="flex gap-1">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => {
                setSelectedCompany((prev) =>
                  prev.includes(company)
                    ? prev.filter((c) => c !== company)
                    : [...prev, company]
                );
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCompany.includes(company)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {company}
            </button>
          ))}
        </div>
      </div>
      {selectedCompany.length < 1 && <div>select companies</div>}
      <div className="grid grid-cols-2 gap-2">
        {selectedCompany.map((company) => (
          <div key={company} className="space-y-4 my-4">
            <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded p-2">
              <CompanySummary company={company} />
              <CompanyInfoCard type="country" />
              <CompanyInfoCard
                className="col-span-2"
                type="overall"
                value={30}
              />
              <CompanyInfoCard type="total" value={14387} />
              <CompanyInfoCard type="average" value={1503} />
              <CompanyInfoChart
                className="col-span-2"
                type="ratio-trend"
                data={
                  companyRatioTrend[company as keyof typeof companyRatioTrend]
                }
              />
              <CompanyInfoChart
                className="col-span-2"
                type="trend"
                data={
                  companiesMonthly[company as keyof typeof companiesMonthly]
                }
              />
              <CompanyInfoChart
                className="col-span-2"
                type="sources"
                data={dataBySource}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//
//
//
//
//
//
//

const companies = ["A", "B", "C", "D", "E", "F", "G"];

const companyRatioTrend = {
  A: [
    { year: 2023, ratio: 24.2 },
    { year: 2024, ratio: 29.8 },
    { year: 2025, ratio: 35.1 },
  ],
  B: [
    { year: 2023, ratio: 15.7 },
    { year: 2024, ratio: 22.9 },
    { year: 2025, ratio: 28.4 },
  ],
  C: [
    { year: 2023, ratio: 22.8 },
    { year: 2024, ratio: 16.1 },
    { year: 2025, ratio: 11.4 },
  ],
  D: [
    { year: 2023, ratio: 9.8 },
    { year: 2024, ratio: 13.5 },
    { year: 2025, ratio: 16.2 },
  ],
  E: [
    { year: 2023, ratio: 13.2 },
    { year: 2024, ratio: 9.1 },
    { year: 2025, ratio: 5.8 },
  ],
  F: [
    { year: 2023, ratio: 28.4 },
    { year: 2024, ratio: 20.5 },
    { year: 2025, ratio: 14.9 },
  ],
  G: [
    { year: 2023, ratio: 9.5 },
    { year: 2024, ratio: 13.8 },
    { year: 2025, ratio: 17.1 },
  ],
};
const companiesMonthly = {
  A: [
    { month: "2024-01", emissions: 1200 },
    { month: "2024-02", emissions: 1150 },
    { month: "2024-03", emissions: 1300 },
    { month: "2024-04", emissions: 1250 },
    { month: "2024-05", emissions: 1100 },
    { month: "2024-06", emissions: 1000 },
    { month: "2024-07", emissions: 950 },
    { month: "2024-08", emissions: 980 },
    { month: "2024-09", emissions: 1050 },
    { month: "2024-10", emissions: 1150 },
    { month: "2024-11", emissions: 1200 },
    { month: "2024-12", emissions: 1180 },
    { month: "2025-01", emissions: 1100 },
    { month: "2025-02", emissions: 1050 },
    { month: "2025-03", emissions: 1000 },
    { month: "2025-04", emissions: 980 },
    { month: "2025-05", emissions: 950 },
    { month: "2025-06", emissions: 920 },
  ],
  B: [
    { month: "2024-01", emissions: 800 },
    { month: "2024-02", emissions: 820 },
    { month: "2024-03", emissions: 850 },
    { month: "2024-04", emissions: 900 },
    { month: "2024-05", emissions: 950 },
    { month: "2024-06", emissions: 980 },
    { month: "2024-07", emissions: 1000 },
    { month: "2024-08", emissions: 1050 },
    { month: "2024-09", emissions: 1100 },
    { month: "2024-10", emissions: 1150 },
    { month: "2024-11", emissions: 1200 },
    { month: "2024-12", emissions: 1250 },
    { month: "2025-01", emissions: 1300 },
    { month: "2025-02", emissions: 1350 },
    { month: "2025-03", emissions: 1400 },
    { month: "2025-04", emissions: 1420 },
    { month: "2025-05", emissions: 1450 },
    { month: "2025-06", emissions: 1480 },
  ],
  C: [
    { month: "2024-01", emissions: 1500 },
    { month: "2024-02", emissions: 1520 },
    { month: "2024-03", emissions: 1480 },
    { month: "2024-04", emissions: 1460 },
    { month: "2024-05", emissions: 1450 },
    { month: "2024-06", emissions: 1440 },
    { month: "2024-07", emissions: 1420 },
    { month: "2024-08", emissions: 1400 },
    { month: "2024-09", emissions: 1380 },
    { month: "2024-10", emissions: 1360 },
    { month: "2024-11", emissions: 1340 },
    { month: "2024-12", emissions: 1320 },
    { month: "2025-01", emissions: 1300 },
    { month: "2025-02", emissions: 1280 },
    { month: "2025-03", emissions: 1260 },
    { month: "2025-04", emissions: 1240 },
    { month: "2025-05", emissions: 1220 },
    { month: "2025-06", emissions: 1200 },
  ],
  D: [
    { month: "2024-01", emissions: 600 },
    { month: "2024-02", emissions: 650 },
    { month: "2024-03", emissions: 700 },
    { month: "2024-04", emissions: 680 },
    { month: "2024-05", emissions: 720 },
    { month: "2024-06", emissions: 750 },
    { month: "2024-07", emissions: 800 },
    { month: "2024-08", emissions: 780 },
    { month: "2024-09", emissions: 760 },
    { month: "2024-10", emissions: 740 },
    { month: "2024-11", emissions: 720 },
    { month: "2024-12", emissions: 700 },
    { month: "2025-01", emissions: 680 },
    { month: "2025-02", emissions: 660 },
    { month: "2025-03", emissions: 640 },
    { month: "2025-04", emissions: 620 },
    { month: "2025-05", emissions: 600 },
    { month: "2025-06", emissions: 580 },
  ],
  E: [
    { month: "2024-01", emissions: 900 },
    { month: "2024-02", emissions: 910 },
    { month: "2024-03", emissions: 920 },
    { month: "2024-04", emissions: 930 },
    { month: "2024-05", emissions: 940 },
    { month: "2024-06", emissions: 950 },
    { month: "2024-07", emissions: 960 },
    { month: "2024-08", emissions: 970 },
    { month: "2024-09", emissions: 980 },
    { month: "2024-10", emissions: 990 },
    { month: "2024-11", emissions: 1000 },
    { month: "2024-12", emissions: 1010 },
    { month: "2025-01", emissions: 1020 },
    { month: "2025-02", emissions: 1030 },
    { month: "2025-03", emissions: 1040 },
    { month: "2025-04", emissions: 1050 },
    { month: "2025-05", emissions: 1060 },
    { month: "2025-06", emissions: 1070 },
  ],
  F: [
    { month: "2024-01", emissions: 1800 },
    { month: "2024-02", emissions: 1750 },
    { month: "2024-03", emissions: 1700 },
    { month: "2024-04", emissions: 1650 },
    { month: "2024-05", emissions: 1600 },
    { month: "2024-06", emissions: 1550 },
    { month: "2024-07", emissions: 1500 },
    { month: "2024-08", emissions: 1450 },
    { month: "2024-09", emissions: 1400 },
    { month: "2024-10", emissions: 1350 },
    { month: "2024-11", emissions: 1300 },
    { month: "2024-12", emissions: 1250 },
    { month: "2025-01", emissions: 1200 },
    { month: "2025-02", emissions: 1150 },
    { month: "2025-03", emissions: 1100 },
    { month: "2025-04", emissions: 1050 },
    { month: "2025-05", emissions: 1000 },
    { month: "2025-06", emissions: 950 },
  ],
  G: [
    { month: "2024-01", emissions: 500 },
    { month: "2024-02", emissions: 520 },
    { month: "2024-03", emissions: 540 },
    { month: "2024-04", emissions: 560 },
    { month: "2024-05", emissions: 580 },
    { month: "2024-06", emissions: 600 },
    { month: "2024-07", emissions: 620 },
    { month: "2024-08", emissions: 640 },
    { month: "2024-09", emissions: 660 },
    { month: "2024-10", emissions: 680 },
    { month: "2024-11", emissions: 700 },
    { month: "2024-12", emissions: 720 },
    { month: "2025-01", emissions: 740 },
    { month: "2025-02", emissions: 760 },
    { month: "2025-03", emissions: 780 },
    { month: "2025-04", emissions: 800 },
    { month: "2025-05", emissions: 820 },
    { month: "2025-06", emissions: 840 },
  ],
};
const countries = ["US", "KR", "JP", "DE", "UK"];
const totalValue = 40000;
const dataBySource = [
  { name: "gasoline", value: 400 },
  { name: "lpg", value: 300 },
  { name: "diesel", value: 300 },
  { name: "electricity", value: 200 },
];

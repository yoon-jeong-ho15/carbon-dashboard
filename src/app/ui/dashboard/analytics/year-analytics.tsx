"use client";

import { useState } from "react";
import MontlyCompany from "./year/montly-company";
import MonthlyCompare from "./year/montly-compare";
import { YearInfoCard } from "./year/year-info-card";
import TotalTrend from "./year/total-trend";

export default function YearAnalytics() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  return (
    <div className="grid grid-cols-8 gap-3">
      <div className="col-span-8">
        <TotalTrend />
      </div>

      {/* <div className="bg-gray-100">
          Selected the year
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div> */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 col-span-2">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-medium text-gray-600">Selected Year</h3>
          <div className="flex gap-2 items-center"></div>
        </div>

        <p className="text-6xl font-bold text-gray-900 mb-1 mt-4 text-center">
          2025
        </p>
      </div>
      <YearInfoCard type="companies" year={"2025"} value={5} />
      <div></div>
      <YearInfoCard type="overall" year={"2025"} value={40} />
      <YearInfoCard type="monthAvg" year={"2025"} value={1100} />
      <YearInfoCard
        className="col-span-2"
        type="total"
        year={"2025"}
        value={10000}
      />

      <MonthlyCompare className="col-span-4" selectedYear={selectedYear} />
      <MontlyCompany className="col-span-4" selectedYear={selectedYear} />
    </div>
  );
}

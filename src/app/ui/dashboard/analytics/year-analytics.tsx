"use client";

import MontlyCompany from "./year/m-company";
import MonthlyEmissionChart from "./year/m-emission";
import { YearInfoCard } from "./year/y-info-card";
import TotalTrend from "./year/total-trend";
import { useYearDetails, useYearlyAnalysis } from "@/app/hooks/useYears";
import YearlyCompany from "./year/y-company";
import YearlySourceChart from "./year/y-source";
import { useSearchParams } from "next/navigation";
import YearSelect from "./year/y-select";

export default function YearAnalytics() {
  const searchParams = useSearchParams();
  const selectedYear = searchParams.get("year") || "2025";
  const { yearDetails, isLoading, error } = useYearDetails(selectedYear);
  const {
    yearDetails: prevYearDetails,
    isLoading: prevLoading,
    error: prevError,
  } = useYearDetails(Number(selectedYear) - 1 + "");

  if (isLoading || prevLoading) {
    return <div>loading</div>;
  }

  if (error || prevError) {
    return <div>error</div>;
  }

  if (!yearDetails) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid grid-cols-8 gap-3">
      <TotalTrend className="col-span-8" />

      <YearSelect selectedYear={selectedYear} />

      <YearInfoCard
        type="overall"
        year={selectedYear}
        value={(Math.random() * 70 + 30).toFixed(1)}
      />
      <YearInfoCard
        type="companies"
        year={selectedYear}
        value={yearDetails.companyCount}
      />
      <MonthlyEmissionChart
        className="col-span-4 row-span-2"
        currentYearData={yearDetails.monthlyEmissions}
        previousYearData={prevYearDetails?.monthlyEmissions}
      />

      <YearInfoCard
        className="col-span-1"
        type="monthAvg"
        year={selectedYear}
        value={yearDetails.monthlyAverage.toLocaleString()}
      />

      <YearInfoCard
        className="col-span-1"
        type="total"
        year={selectedYear}
        value={yearDetails.totalEmissions.toLocaleString()}
      />

      <YearlySourceChart
        className="col-span-2"
        data={yearDetails.sourceEmissions}
      />
      <YearlyCompany
        className="col-span-4 row-span-2"
        year={selectedYear}
        companyEmissions={yearDetails.companyEmissions}
      />
      <MontlyCompany
        className="col-span-4 row-span-2"
        year={selectedYear}
      />
    </div>
  );
}

"use client";

import { useOverviewData, useYearlyAnalysis } from "@/app/hooks/useYears";
import { getMonth } from "@/app/lib/util";
import InfoCard from "@/app/ui/dashboard/overview/o-info-cards";
import RecentMonths from "@/app/ui/dashboard/overview/o-recent-months";
import TotalBarChart from "@/app/ui/dashboard/overview/o-total-piecharts";
import YearlyTrend from "@/app/ui/dashboard/overview/o-yealy-trend";
import { useMemo } from "react";

export default function Page() {
  const { overviewData, isLoading, error } = useOverviewData();
  const { yearlyAnalysis } = useYearlyAnalysis();

  const now = new Date();
  const thisYear = now.getFullYear() + "";
  const lastMonth = getMonth(now.getMonth() - 1 + "");

  const totalRecentEmissions = useMemo(
    () =>
      overviewData?.recentMonthlyEmissions?.reduce(
        (sum, m) => sum + m.emissions,
        0
      ) ?? 0,
    [overviewData?.recentMonthlyEmissions]
  );

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error || !overviewData) {
    return (
      <div className="p-4 text-center text-red-600">
        Error loading overview data
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50/50 rounded m-2 p-2
        border border-gray-200 grid grid-cols-5 gap-3
        overflow-y-scroll h-full"
    >
      <div className="row-span-2">
        <div>logo</div>
        <p>Acme Corp.</p>
        <p>2021 - 2025</p>
      </div>

      <InfoCard
        type="recentMonths"
        data={totalRecentEmissions}
        date={thisYear}
      />

      <InfoCard
        type="topCountry"
        alltime
        data={overviewData.countryTotalEmissions?.[0]?.country}
        label={overviewData.countryTotalEmissions?.[0]?.emissions + " tCO₂e"}
        etc
      />

      <InfoCard
        type="topCompany"
        alltime
        data={overviewData.companyTotalEmissions?.[0]?.name}
        label={
          overviewData.companyTotalEmissions?.[0]?.totalEmissions + " tCO₂e"
        }
        etc
      />

      <InfoCard
        type="topSource"
        alltime
        data={capitalize(overviewData.sourceTotalEmissions?.[0]?.source)}
        label={overviewData.sourceTotalEmissions?.[0]?.emissions + " tCO₂e"}
        etc
      />

      <InfoCard
        type="lastMonth"
        date={`${lastMonth} ${thisYear}`}
        data={overviewData.recentMonthlyEmissions?.slice(-1)[0]?.emissions}
      />

      <InfoCard
        type="totalCompanies"
        data={overviewData.totalCompanies}
        alltime
        etc
      />

      <InfoCard
        type="averagePerCompany"
        data={Math.round(overviewData.averageEmissionsPerCompany)}
        alltime
      />

      <InfoCard
        type="averagePerMonth"
        data={Math.round(overviewData.averageEmissionsPerMonth)}
        alltime
      />

      <YearlyTrend className="col-span-2 row-span-2" data={yearlyAnalysis} />

      <TotalBarChart
        type="company"
        data={overviewData?.companyTotalEmissions}
      />
      <TotalBarChart type="region" data={overviewData?.countryTotalEmissions} />
      <TotalBarChart type="source" data={overviewData?.sourceTotalEmissions} />

      <RecentMonths
        className="col-span-3"
        data={overviewData?.recentMonthlyEmissions}
      />
    </div>
  );
}

const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

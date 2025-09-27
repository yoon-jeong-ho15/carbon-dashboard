"use client";

import { useSearchParams } from "next/navigation";
import AnalyticsNavbar from "@/app/ui/dashboard/analytics/analytics-navbar";
import CompanyAnalytics from "@/app/ui/dashboard/analytics/company-analytics";
import SourceAnalytics from "@/app/ui/dashboard/analytics/source-analytics";
import YearAnalytics from "@/app/ui/dashboard/analytics/year-analytics";

export default function Page() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "year";

  return (
    <div className="shadow rounded-lg h-full flex flex-col">
      <AnalyticsNavbar selectedCategory={selectedCategory} />
      <div className="flex-1 overflow-auto">
        <div className={selectedCategory === "year" ? "block" : "hidden"}>
          <YearAnalytics />
        </div>
        <div className={selectedCategory === "company" ? "block" : "hidden"}>
          <CompanyAnalytics />
        </div>
        <div className={selectedCategory === "source" ? "block" : "hidden"}>
          <SourceAnalytics />
        </div>
      </div>
    </div>
  );
}

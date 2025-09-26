"use client";

import { useYearDetails } from "@/app/hooks/useYears";
import { useSearchParams } from "next/navigation";

export default function SourceAnalytics() {
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

  return <div className="grid grid-cols-8 gap-3"></div>;
}

"use client";

import { useYearlyAnalysis } from "@/app/hooks/useYears";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Cell,
  ReferenceLine,
} from "recharts";

export default function TotalTrend({ className }: { className: string }) {
  const { yearlyAnalysis, isLoading, error } = useYearlyAnalysis();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedYear = searchParams.get("year") || "2025";

  if (isLoading || error || !yearlyAnalysis) {
    return <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />;
  }

  // 모든 월별 데이터를 시간순으로 정렬
  const allMonthlyData = yearlyAnalysis.flatMap((yearData: any) =>
    yearData.monthlyEmissions.map((monthData: any) => ({
      ...monthData,
      year: yearData.year,
      yearMonth: `${yearData.year}-${monthData.month
        .toString()
        .padStart(2, "0")}`,
    }))
  );

  // 시간순 정렬
  allMonthlyData.sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

  const handleYearChange = useCallback(
    (year: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("year", year);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div
      className={`"bg-white px-4 py-1 rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      <ResponsiveContainer width="100%" height={120}>
        <BarChart
          data={allMonthlyData}
          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
        >
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#6B7280" }}
            interval={11}
          />
          <Bar
            dataKey="emissions"
            radius={[2, 2, 0, 0]}
            onClick={(data) => handleYearChange(data.payload.year)}
            cursor={"pointer"}
            animationDuration={200}
          >
            {allMonthlyData.map((entry: any, index: number) => {
              const isSelected = entry.year === selectedYear;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isSelected ? "#9CA3AF" : "#E5E7EB"}
                />
              );
            })}
          </Bar>

          {/* 년도별 구분선 추가 */}
          {yearlyAnalysis.slice(1).map((yearData: any, index: number) => {
            const yearStartIndex = allMonthlyData.findIndex(
              (d) => d.year === yearData.year
            );
            return (
              <ReferenceLine
                key={`separator-${index}`}
                x={yearStartIndex - 0.5}
                stroke="#D1D5DB"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

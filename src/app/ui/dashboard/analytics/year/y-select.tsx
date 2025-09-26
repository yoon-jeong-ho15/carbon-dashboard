"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useYearlyAnalysis } from "@/app/hooks/useYears";

export default function YearSelect({ selectedYear }: { selectedYear: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { yearlyAnalysis } = useYearlyAnalysis();

  const availableYears = yearlyAnalysis?.map((y) => y.year) || [];
  const minYear = Math.min(...availableYears.map(Number));
  const maxYear = Math.max(...availableYears.map(Number));
  const currentYear = parseInt(selectedYear);

  const handleYearChange = useCallback(
    (change: number) => {
      const newYear = currentYear + change;
      if (newYear >= minYear && newYear <= maxYear) {
        const params = new URLSearchParams(searchParams);
        params.set("year", newYear.toString());
        router.push(`?${params.toString()}`);
      }
    },
    [currentYear, minYear, maxYear, router, searchParams]
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 col-span-2">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">Selected Year</h3>
      </div>

      <div className="flex justify-center items-center mb-1 mt-4">
        <button
          className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center font-medium ${
            currentYear <= minYear
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => handleYearChange(-1)}
          disabled={currentYear <= minYear}
        >
          -
        </button>
        <span className="text-6xl font-bold text-gray-900 mx-6">
          {selectedYear}
        </span>
        <button
          className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center font-medium ${
            currentYear >= maxYear
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => handleYearChange(1)}
          disabled={currentYear >= maxYear}
        >
          +
        </button>
      </div>
    </div>
  );
}

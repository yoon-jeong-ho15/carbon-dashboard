"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useState } from "react";

export default function YearlyTrend() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const yearlyData = [
    { year: 2021, emissions: 1250 },
    { year: 2022, emissions: 1180 },
    { year: 2023, emissions: 1320 },
    { year: 2024, emissions: 1100 },
    { year: 2025, emissions: 980 },
  ];

  const monthlyData = {
    2021: [
      { month: "1", emissions: 120 },
      { month: "2", emissions: 110 },
      { month: "3", emissions: 105 },
      { month: "4", emissions: 95 },
      { month: "5", emissions: 100 },
      { month: "6", emissions: 115 },
      { month: "7", emissions: 125 },
      { month: "8", emissions: 130 },
      { month: "9", emissions: 108 },
      { month: "10", emissions: 102 },
      { month: "11", emissions: 95 },
      { month: "12", emissions: 145 },
    ],
    2022: [
      { month: "1", emissions: 115 },
      { month: "2", emissions: 105 },
      { month: "3", emissions: 98 },
      { month: "4", emissions: 92 },
      { month: "5", emissions: 88 },
      { month: "6", emissions: 95 },
      { month: "7", emissions: 102 },
      { month: "8", emissions: 108 },
      { month: "9", emissions: 103 },
      { month: "10", emissions: 99 },
      { month: "11", emissions: 87 },
      { month: "12", emissions: 128 },
    ],
    2023: [
      { month: "1", emissions: 125 },
      { month: "2", emissions: 118 },
      { month: "3", emissions: 112 },
      { month: "4", emissions: 108 },
      { month: "5", emissions: 115 },
      { month: "6", emissions: 122 },
      { month: "7", emissions: 135 },
      { month: "8", emissions: 142 },
      { month: "9", emissions: 118 },
      { month: "10", emissions: 110 },
      { month: "11", emissions: 105 },
      { month: "12", emissions: 150 },
    ],
    2024: [
      { month: "1", emissions: 105 },
      { month: "2", emissions: 98 },
      { month: "3", emissions: 92 },
      { month: "4", emissions: 88 },
      { month: "5", emissions: 85 },
      { month: "6", emissions: 90 },
      { month: "7", emissions: 95 },
      { month: "8", emissions: 102 },
      { month: "9", emissions: 96 },
      { month: "10", emissions: 89 },
      { month: "11", emissions: 82 },
      { month: "12", emissions: 118 },
    ],
    2025: [
      { month: "1", emissions: 95 },
      { month: "2", emissions: 88 },
      { month: "3", emissions: 82 },
      { month: "4", emissions: 78 },
      { month: "5", emissions: 75 },
      { month: "6", emissions: 80 },
      { month: "7", emissions: 85 },
      { month: "8", emissions: 92 },
      { month: "9", emissions: null },
      { month: "10", emissions: null },
      { month: "11", emissions: null },
      { month: "12", emissions: null },
    ],
  };

  const handleBarClick = (data: any) => {
    setSelectedYear(data.year);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex w-full">
        <div className="w-2/5 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            연도별 총 배출량 (tCO2eq)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} tCO2eq`, "배출량"]}
                labelFormatter={(label) => `${label}년`}
              />
              <Bar
                dataKey="emissions"
                fill="#3B82F6"
                cursor="pointer"
                onClick={handleBarClick}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-3/5 bg-white p-4 rounded-lg shadow ml-4">
          <h3 className="text-lg font-semibold mb-4">
            {selectedYear
              ? `${selectedYear}년 월별 배출량 추이`
              : "연도를 선택해주세요"}
          </h3>
          {selectedYear ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData[selectedYear as keyof typeof monthlyData]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => {
                    const months = {
                      "1": "Jan",
                      "2": "Feb",
                      "3": "Mar",
                      "4": "Apr",
                      "5": "May",
                      "6": "Jun",
                      "7": "Jul",
                      "8": "Aug",
                      "9": "Sep",
                      "10": "Oct",
                      "11": "Nov",
                      "12": "Dec",
                    };
                    return months[value as keyof typeof months] || value;
                  }}
                />
                <YAxis domain={[0, 200]} />
                <Tooltip
                  formatter={(value: number) => [
                    `${value} tCO2eq`,
                    "Emissions",
                  ]}
                  labelFormatter={(label) => {
                    const months = {
                      "1": "Jan",
                      "2": "Feb",
                      "3": "Mar",
                      "4": "Apr",
                      "5": "May",
                      "6": "Jun",
                      "7": "Jul",
                      "8": "Aug",
                      "9": "Sep",
                      "10": "Oct",
                      "11": "Nov",
                      "12": "Dec",
                    };
                    const monthName =
                      months[label as keyof typeof months] || label;
                    return `${monthName} ${selectedYear}`;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              왼쪽 바 차트에서 연도를 클릭하면 해당 연도의 월별 추이를 확인할 수
              있습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

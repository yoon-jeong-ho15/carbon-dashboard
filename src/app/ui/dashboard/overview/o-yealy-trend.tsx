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

export default function YearlyTrend({
  className,
  data,
}: {
  className: string;
  data: any;
}) {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
        <div className="h-80 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow ${className} flex flex-col`}
    >
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Yearly Total Emissions
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              domain={[0, (dataMax: number) => Math.round(dataMax * 1.2)]}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value.toLocaleString()} tCO₂e`,
                "Emissions",
              ]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="totalEmissions"
              fill="#0284c7"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              animationDuration={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

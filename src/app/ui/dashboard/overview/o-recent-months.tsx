import { getMonth } from "@/app/lib/util";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

export default function RecentMonths({
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
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Recent 12 Months
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="yearMonth"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickFormatter={(label) => {
              const month = label.split("-")[1];
              const monthName = getMonth(parseInt(month).toString());
              return `${monthName}`;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()} tCO₂e`]}
            labelFormatter={(label) => {
              const [year, month] = label.split("-");
              const monthName = getMonth(parseInt(month).toString());
              return `${monthName} ${year}`;
            }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="emissions"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: "#10B981",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

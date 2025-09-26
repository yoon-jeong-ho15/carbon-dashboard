import { getMonth } from "@/app/lib/util";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  Legend,
} from "recharts";

export default function MonthlyEmissionChart({
  className,
  currentYearData,
  previousYearData,
}: {
  className?: string;
  currentYearData: any;
  previousYearData?: any;
}) {
  // 두 년도 데이터를 합쳐서 비교용 데이터 생성
  const combinedData = (() => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      const cur = currentYearData?.[i];
      const prev = previousYearData?.[i];
      result.push({
        month: i + 1,
        currentYear: cur?.emissions || null,
        previousYear: prev?.emissions || null,
      });
    }
    return result;
  })();

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Montly Emissions
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(label) => {
              return getMonth(label);
            }}
          />
          <YAxis domain={[1000, 2000]} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} tCO2eq`,
              name === "currentYear"
                ? `${currentYearData[0].yearMonth.substring(0, 4)}`
                : `${previousYearData[0].yearMonth.substring(0, 4)}`,
            ]}
            labelFormatter={(label) => {
              return getMonth(label);
            }}
          />
          <Legend
            formatter={(value) => {
              return value === "currentYear"
                ? currentYearData[0]?.yearMonth.substring(0, 4)
                : previousYearData
                ? previousYearData[0]?.yearMonth.substring(0, 4)
                : null;
            }}
          />
          <Line
            type="monotone"
            dataKey="currentYear"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
            name="currentYear"
          />
          {previousYearData && (
            <Line
              type="monotone"
              dataKey="previousYear"
              stroke="#a1a1aa"
              strokeWidth={2}
              dot={{ fill: "#a1a1aa", strokeWidth: 2, r: 4 }}
              name="previousYear"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

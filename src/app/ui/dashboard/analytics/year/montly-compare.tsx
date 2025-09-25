import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

export default function MonthlyCompare({
  className,
  selectedYear,
}: {
  className?: string;
  selectedYear: number;
}) {
  const currentYearData =
    monthlyData[selectedYear as keyof typeof monthlyData] || [];
  const previousYearData =
    monthlyData[(selectedYear - 1) as keyof typeof monthlyData] || [];

  // 두 년도 데이터를 합쳐서 비교용 데이터 생성
  const combinedData = currentYearData.map((current, index) => ({
    month: current.month,
    currentYear: current.emissions,
    previousYear: previousYearData[index]?.emissions || null,
  }));

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-semibold mb-4">
        {selectedYear} Montly Emissions
      </h3>
      {selectedYear ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedData}>
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
              formatter={(value: number, name: string) => [
                `${value} tCO2eq`,
                name === "currentYear"
                  ? `${selectedYear}년`
                  : `${selectedYear - 1}년`,
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
                const monthName = months[label as keyof typeof months] || label;
                return `${monthName}`;
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
            <Line
              type="monotone"
              dataKey="previousYear"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              name="previousYear"
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
  );
}

const monthlyData: Record<
  number,
  { month: string; emissions: number | null }[]
> = {
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

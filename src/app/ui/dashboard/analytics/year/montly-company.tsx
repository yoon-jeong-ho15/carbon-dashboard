import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";

export default function MonthlyCompany({
  selectedYear,
  className,
}: {
  selectedYear: number;
  className?: string;
}) {
  const companyData = {
    A: [
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
    B: [
      { month: "1", emissions: 85 },
      { month: "2", emissions: 90 },
      { month: "3", emissions: 88 },
      { month: "4", emissions: 92 },
      { month: "5", emissions: 87 },
      { month: "6", emissions: 95 },
      { month: "7", emissions: 98 },
      { month: "8", emissions: 103 },
      { month: "9", emissions: 96 },
      { month: "10", emissions: 89 },
      { month: "11", emissions: 84 },
      { month: "12", emissions: 110 },
    ],
    C: [
      { month: "1", emissions: 75 },
      { month: "2", emissions: 78 },
      { month: "3", emissions: 82 },
      { month: "4", emissions: 79 },
      { month: "5", emissions: 85 },
      { month: "6", emissions: 88 },
      { month: "7", emissions: 92 },
      { month: "8", emissions: 95 },
      { month: "9", emissions: 87 },
      { month: "10", emissions: 80 },
      { month: "11", emissions: 76 },
      { month: "12", emissions: 98 },
    ],
    D: [
      { month: "1", emissions: 135 },
      { month: "2", emissions: 128 },
      { month: "3", emissions: 142 },
      { month: "4", emissions: 138 },
      { month: "5", emissions: 145 },
      { month: "6", emissions: 150 },
      { month: "7", emissions: 155 },
      { month: "8", emissions: 148 },
      { month: "9", emissions: 140 },
      { month: "10", emissions: 132 },
      { month: "11", emissions: 125 },
      { month: "12", emissions: 160 },
    ],
    E: [
      { month: "1", emissions: 65 },
      { month: "2", emissions: 68 },
      { month: "3", emissions: 70 },
      { month: "4", emissions: 72 },
      { month: "5", emissions: 75 },
      { month: "6", emissions: 78 },
      { month: "7", emissions: 80 },
      { month: "8", emissions: 82 },
      { month: "9", emissions: 77 },
      { month: "10", emissions: 73 },
      { month: "11", emissions: 69 },
      { month: "12", emissions: 85 },
    ],
    F: [
      { month: "1", emissions: 95 },
      { month: "2", emissions: 92 },
      { month: "3", emissions: 98 },
      { month: "4", emissions: 105 },
      { month: "5", emissions: 110 },
      { month: "6", emissions: 108 },
      { month: "7", emissions: 112 },
      { month: "8", emissions: 115 },
      { month: "9", emissions: 102 },
      { month: "10", emissions: 97 },
      { month: "11", emissions: 93 },
      { month: "12", emissions: 120 },
    ],
    G: [
      { month: "1", emissions: 88 },
      { month: "2", emissions: 85 },
      { month: "3", emissions: 90 },
      { month: "4", emissions: 93 },
      { month: "5", emissions: 96 },
      { month: "6", emissions: 100 },
      { month: "7", emissions: 105 },
      { month: "8", emissions: 108 },
      { month: "9", emissions: 95 },
      { month: "10", emissions: 90 },
      { month: "11", emissions: 86 },
      { month: "12", emissions: 112 },
    ],
  };

  // 모든 회사 데이터를 월별로 합치기
  const combinedData = companyData.A.map((_, index) => ({
    month: companyData.A[index].month,
    A: companyData.A[index].emissions,
    B: companyData.B[index].emissions,
    C: companyData.C[index].emissions,
    D: companyData.D[index].emissions,
    E: companyData.E[index].emissions,
    F: companyData.F[index].emissions,
    G: companyData.G[index].emissions,
  }));

  const colors = {
    A: "#EF4444", // red
    B: "#10B981", // green
    C: "#3B82F6", // blue
    D: "#F59E0B", // yellow
    E: "#8B5CF6", // purple
    F: "#F97316", // orange
    G: "#06B6D4", // cyan
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-semibold mb-4">
        {selectedYear
          ? `${selectedYear} Company Emissions`
          : "연도를 선택해주세요"}
      </h3>
      {selectedYear ? (
        <ResponsiveContainer width="100%" height={400}>
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
                `Company ${name}`,
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
                return `${monthName} ${selectedYear}`;
              }}
            />
            <Legend />
            {Object.keys(colors).map((company) => (
              <Line
                key={company}
                type="monotone"
                dataKey={company}
                stroke={colors[company as keyof typeof colors]}
                strokeWidth={2}
                dot={{
                  fill: colors[company as keyof typeof colors],
                  strokeWidth: 2,
                  r: 4,
                }}
                name={`Company ${company}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[400px] text-gray-500">
          왼쪽 바 차트에서 연도를 클릭하면 해당 연도의 회사별 월별 추이를 확인할
          수 있습니다.
        </div>
      )}
    </div>
  );
}

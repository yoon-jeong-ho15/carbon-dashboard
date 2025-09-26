import { getCompanyColor, getMonth } from "@/app/lib/util";
import { useYearCompanyMonthlyData } from "@/app/hooks/useYears";
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
  year,
  className,
}: {
  year: string;
  className?: string;
}) {
  const { monthlyCompanyData, isLoading, error } =
    useYearCompanyMonthlyData(year);

  if (isLoading || !monthlyCompanyData) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
        <div className="h-96 flex items-center justify-center text-gray-500">
          Error loading data
        </div>
      </div>
    );
  }

  const { combinedData, companyNames, companyIds } = monthlyCompanyData;

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        {`${year} Company Monthly Emissions`}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(month) => {
              return getMonth(month);
            }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)} tCO2eq`,
              name,
            ]}
            labelFormatter={(label) => {
              return getMonth(label);
            }}
          />
          <Legend />
          {companyNames.map((companyName, index) => (
            <Line
              key={companyName}
              type="monotone"
              dataKey={companyName}
              stroke={getCompanyColor(companyIds[index])}
              strokeWidth={2}
              dot={{
                fill: getCompanyColor(companyIds[index]),
                strokeWidth: 2,
                r: 4,
              }}
              name={companyName}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

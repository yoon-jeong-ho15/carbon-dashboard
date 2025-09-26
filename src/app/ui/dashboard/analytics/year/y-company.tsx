import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCompanyColor } from "@/app/lib/util";

type CompanyEmission = {
  companyId: string;
  companyName: string;
  country: string;
  emissions: number;
};

export default function YearlyCompany({
  className,
  companyEmissions,
  year,
}: {
  className: string;
  companyEmissions: any;
  year: string;
}) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        {`${year} Company Total Emissions`}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={companyEmissions}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="companyName"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "tCO₂e", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toLocaleString()} tCO₂e`,
              "Total Emissions",
            ]}
            labelFormatter={(label) => `Company: ${label}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="emissions" radius={[4, 4, 0, 0]} name="Total Emissions">
            {companyEmissions?.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={getCompanyColor(entry.companyId)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

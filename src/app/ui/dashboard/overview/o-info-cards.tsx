"use client";

export default function InfoCard({
  type,
  label,
  date,
  data,
  alltime,
  etc,
}: {
  type: string;
  label?: string;
  date?: string;
  data: any;
  alltime?: boolean;
  etc?: boolean;
}) {
  const titleMap: Record<string, string> = {
    recentMonths: "Recent 12 Months Emissions",
    lastMonth: "Last Month",
    totalCompanies: "Total Companies",
    averagePerCompany: "Companies Average",
    averagePerMonth: "Monthly Average",
    topCompany: "Top Company",
    topSource: "Top Source",
    topCountry: "Top Country",
  };

  const title = titleMap[type];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex gap-2 items-center">
          {date ? (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
              {date}
            </span>
          ) : (
            <span className="text-xs px-2 py-1 bg-violet-100 text-violet-600 rounded-full">
              All Time
            </span>
          )}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">
        {data.toLocaleString()}
      </p>

      <p className="text-sm text-gray-500">
        {etc ? label?.toLocaleString() : "tCO₂e"}
      </p>
    </div>
  );
}

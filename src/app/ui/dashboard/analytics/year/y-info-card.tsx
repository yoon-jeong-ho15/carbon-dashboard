export function YearInfoCard({
  type,
  year,
  value,
  className,
}: {
  type: string;
  year: string;
  value: number | string;
  className?: string;
}) {
  const titleMap: Record<string, string> = {
    total: "Total Emissions",
    companies: "Affiliate Companies",
    monthAvg: "Montly Average",
    overall: "Overall Score",
  };

  const title = titleMap[type];

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>

      <p
        className={`font-bold text-gray-900 mb-1 ${
          type === "overall" ? "text-5xl text-center" : "text-4xl"
        }`}
      >
        {value}
      </p>

      <p className="text-sm text-gray-500">
        {type === "companies" ? "companies" : type === "overall" ? "" : "tCO₂e"}
      </p>
    </div>
  );
}

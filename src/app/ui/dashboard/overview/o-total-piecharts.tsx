import { getCompanyColor, getSourceColor } from "@/app/lib/util";

export default function TotalBarChart({
  type,
  data,
}: {
  type: string;
  data: any;
}) {
  const titleMap: Record<string, string> = {
    quarter: "By Quarter",
    company: "By Company",
    region: "By Region",
    source: "By Source",
  };

  // Country colors as bg classes
  const countryColorClasses = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-violet-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
  ];

  // Company color mapping to bg classes
  const companyColorToBg: Record<string, string> = {
    "#2563EB": "bg-blue-600",
    "#059669": "bg-emerald-600",
    "#DC2626": "bg-red-600",
    "#D97706": "bg-amber-600",
    "#7C3AED": "bg-violet-600",
    "#BE185D": "bg-rose-700",
    "#4338CA": "bg-indigo-700",
    "#0F766E": "bg-teal-700",
    "#6B7280": "bg-gray-500",
  };

  const total = data?.reduce((sum: number, item: any) => {
    switch (type) {
      case "company":
        return sum + item.totalEmissions;
      case "region":
        return sum + item.emissions;
      case "source":
        return sum + item.emissions;
      default:
        return sum + (item.value || item.emissions || item.totalEmissions || 0);
    }
  }, 0) || 0;

  const title = titleMap[type];

  const getColorClass = (item: any, index: number) => {
    switch (type) {
      case "company":
        const companyColor = getCompanyColor(item.id);
        return companyColorToBg[companyColor] || "bg-gray-500";
      case "region":
        return countryColorClasses[index % countryColorClasses.length];
      case "source":
        return getSourceColor(item.source);
      default:
        return "bg-gray-500";
    }
  };

  const getValue = (item: any) => {
    switch (type) {
      case "company":
        return item.totalEmissions;
      case "region":
        return item.emissions;
      case "source":
        return item.emissions;
      default:
        return item.value || item.emissions || item.totalEmissions || 0;
    }
  };

  const getName = (item: any) => {
    switch (type) {
      case "company":
        return item.name;
      case "region":
        return item.country;
      case "source":
        return item.source;
      default:
        return item.name || item.country || item.source;
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-100 h-48">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>

      {data && data.length > 0 && (
        <div className="space-y-3">
          {/* Stacked Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
            {data.map((item: any, index: number) => {
              const value = getValue(item);
              const percentage = (value / total) * 100;
              return (
                <div
                  key={index}
                  className={`h-full ${getColorClass(item, index)}`}
                  style={{ width: `${percentage}%` }}
                  title={`${getName(item)}: ${percentage.toFixed(1)}%`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-1 text-xs max-h-20 overflow-y-auto">
            {data.map((item: any, index: number) => {
              const value = getValue(item);
              const percentage = ((value / total) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getColorClass(item, index)}`}
                  />
                  <span className="text-gray-600 truncate">
                    {getName(item)}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

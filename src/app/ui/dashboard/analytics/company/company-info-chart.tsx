import { useState } from "react";

export default function CompanyInfoChart({
  type,
  data,
  className,
}: {
  type: string;
  data: any;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const titleMap: Record<string, string> = {
    sources: "Source Ratio",
    trend: "Monthly Trend",
    "ratio-trend": "Yearly Share",
  };
  const title = titleMap[type];

  if (type === "trend" || type === "ratio-trend") {
    // 트렌드 차트용 로직
    const dataField = type === "ratio-trend" ? "ratio" : "emissions";
    const maxValue = Math.max(...(data?.map((d: any) => d[dataField]) || [0]));
    const minValue = Math.min(...(data?.map((d: any) => d[dataField]) || [0]));
    const range = maxValue - minValue;

    return (
      <div
        className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="text-xs text-gray-500">
            {type === "ratio-trend" ? "3 years (%)" : "18 months (tCO₂e)"}
          </div>
        </div>

        {data && data.length > 0 && (
          <div className="space-y-3">
            {type === "ratio-trend" ? (
              /* Bar Chart with Trend */
              <div className="space-y-2">
                {data.map((item: any, index: number) => {
                  const maxRatio = Math.max(...data.map((d: any) => d.ratio));
                  const barWidth = (item.ratio / maxRatio) * 100;
                  const prevRatio = index > 0 ? data[index - 1].ratio : null;
                  const change = prevRatio ? item.ratio - prevRatio : 0;
                  const isIncrease = change > 0;

                  return (
                    <div
                      key={item.year}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className="w-8 text-gray-500">{item.year}</div>
                      <div className="flex-1 relative">
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right font-medium">
                        {item.ratio}%
                      </div>

                      <div
                        className={`w-12 text-xs flex items-center justify-end ${
                          isIncrease ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {!prevRatio ? "" : isIncrease ? "↗" : "↘"}
                        {prevRatio && Math.abs(change).toFixed(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Line Chart for emissions */
              <div className="relative h-20 w-full">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 800 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id={`grid-${type}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="800" height="100" fill={`url(#grid-${type})`} />

                  <path
                    d={data
                      .map((item: any, index: number) => {
                        const x = (index / (data.length - 1)) * 790 + 5;
                        const y =
                          range > 0
                            ? 85 - ((item[dataField] - minValue) / range) * 70
                            : 50;
                        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {data.map((item: any, index: number) => {
                    const x = (index / (data.length - 1)) * 790 + 5;
                    const y =
                      range > 0
                        ? 85 - ((item[dataField] - minValue) / range) * 70
                        : 50;
                    const isHovered = hoveredIndex === index;

                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? "5" : "3"}
                          fill={isHovered ? "#1d4ed8" : "#3b82f6"}
                          stroke="white"
                          strokeWidth="1"
                          style={{ transition: "all 0.2s ease" }}
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="10"
                          fill="transparent"
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <title>
                            {(() => {
                              const [year, month] = item.month.split("-");
                              const monthNames = [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ];
                              const monthName = monthNames[parseInt(month) - 1];
                              return `${monthName} ${year}: ${item.emissions.toLocaleString()} tCO₂e`;
                            })()}
                          </title>
                        </circle>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 기존 소스 비율 차트 로직
  const total =
    data?.reduce((sum: number, item: any) => sum + item.value, 0) || 0;
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-sky-500",
    "bg-lime-500",
    "bg-rose-500",
  ];
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>

      {data && data.length > 0 && (
        <div className="space-y-3">
          {/* Stacked Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
            {data.map((item: any, index: number) => {
              const percentage = (item.value / total) * 100;
              return (
                <div
                  key={item.name}
                  className={`h-full ${colors[index % colors.length]}`}
                  style={{ width: `${percentage}%` }}
                  title={`${item.name}: ${percentage.toFixed(1)}%`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-1 text-xs">
            {data.map((item: any, index: number) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      colors[index % colors.length]
                    }`}
                  />
                  <span className="text-gray-600 truncate">
                    {item.name}: {percentage}%
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

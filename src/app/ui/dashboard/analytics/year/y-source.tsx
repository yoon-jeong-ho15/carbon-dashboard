import { getSourceColor } from "@/app/lib/util";

export default function YearlySourceChart({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  const total =
    data?.reduce((sum: number, item: any) => sum + item.emissions, 0) || 0;

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">
          Emissions by Source
        </h3>
      </div>

      {data && data.length > 0 && (
        <div className="space-y-3">
          {/* Stacked Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
            {data.map((item: any, index: number) => {
              const percentage = (item.emissions / total) * 100;
              return (
                <div
                  key={item.source}
                  className={`h-full ${getSourceColor(item.source)}`}
                  style={{ width: `${percentage}%` }}
                  title={`${item.source}: ${percentage.toFixed(1)}%`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-1 text-xs">
            {data.map((item: any, index: number) => {
              const percentage = ((item.emissions / total) * 100).toFixed(1);
              return (
                <div key={item.source} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getSourceColor(
                      item.source
                    )}`}
                  />
                  <span className="text-gray-600 truncate">
                    {item.source}: {percentage}%
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

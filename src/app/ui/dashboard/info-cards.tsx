"use client";

export default function InfoCards() {
  return (
    <>
      <InfoCard type="thisYear" label={"2025"} value={10000} />
      <InfoCard type="lastMonth" label={"August"} value={5000} />
      <TopInfoCard type="topCompany" label={"ACME corp."} value={6000} />
      <TopInfoCard type="topSource" label={"Gasoline"} value={3000} />
    </>
  );
}

export function InfoCard({
  type,
  label,
  value,
}: {
  type: string;
  label: string;
  value: number;
}) {
  const titleMap: Record<string, string> = {
    thisYear: "This Year",
    lastMonth: "Last Month",
  };

  const title = titleMap[type];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            {label}
          </span>
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-1">
        {value.toLocaleString()}
      </p>

      <p className="text-sm text-gray-500">tCO₂e</p>
    </div>
  );
}

export function TopInfoCard({
  type,
  label,
  value,
}: {
  type: string;
  label: string;
  value: number;
}) {
  const titleMap: Record<string, string> = {
    topCompany: "Top Company",
    topSource: "Top Source",
  };

  const title = titleMap[type];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-xs px-2 py-1 bg-violet-100 text-violet-600 rounded-full">
            All Time
          </span>
        </div>
      </div>

      <p className="text-2xl font-bold text-gray-900 mb-1">{label}</p>

      <p className="text-sm text-gray-500">{value.toLocaleString()} tCO₂e</p>
    </div>
  );
}

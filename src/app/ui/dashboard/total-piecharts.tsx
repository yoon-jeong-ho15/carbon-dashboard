"use client";

import { ResponsiveContainer, PieChart, Pie } from "recharts";

export default function TotalPieCharts() {
  const dataByQuarter = [
    { name: "1", value: 105 },
    { name: "2", value: 98 },
    { name: "3", value: 92 },
    { name: "4", value: 88 },
  ];
  const dataByRegion = [
    { name: "US", value: 400 },
    { name: "DE", value: 300 },
    { name: "JP", value: 300 },
    { name: "UK", value: 200 },
    { name: "KR", value: 278 },
  ];
  const dataBySource = [
    { name: "gasoline", value: 400 },
    { name: "lpg", value: 300 },
    { name: "diesel", value: 300 },
    { name: "electricity", value: 200 },
  ];
  const dataByCompany = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];
  return (
    <>
      <TotalPieChart type="quarter" data={dataByQuarter} />
      <TotalPieChart type="company" data={dataByCompany} />
      <TotalPieChart type="region" data={dataByRegion} />
      <TotalPieChart type="source" data={dataBySource} />
    </>
  );
}

export function TotalPieChart({
  type,
  data,
}: {
  type: string;
  data: { name: string; value: number }[];
}) {
  const titleMap: Record<string, string> = {
    quarter: "By Quarter",
    company: "By Company",
    region: "By Region",
    source: "By Source",
  };

  const title = titleMap[type];
  return (
    <div className="h-full overflow-hidden">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="80%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

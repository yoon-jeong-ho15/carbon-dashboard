import { Company } from "@/app/lib/type";
import { useState } from "react";
import Image from "next/image";

export default function CompanyInfoCard({
  type,
  value,
  label,
  ratio,
  name,
  className,
}: {
  type: string;
  value?: number | string;
  label?: string;
  ratio?: number;
  name?: string;
  className?: string;
}) {
  const titleMap: Record<string, string> = {
    total: "Total Emissions",
    ratio: "Emission Ratio",
    average: "Monthly Average",
    overall: "Overall Score",
    country: "Region",
  };
  const title = titleMap[type];

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>

      <div className="flex divide-x divide-gray-500">
        {type === "country" && (
          <div className="py-1 px-2 mr-2">
            <Image
              src={`/flag/${value}.png`}
              alt="Flag"
              width={48}
              height={32}
              className="inline-block shadow"
            />
          </div>
        )}
        <p
          className={`font-bold text-gray-900 mb-1 ${
            type === "overall" ? "text-5xl text-center" : "text-4xl"
          }`}
        >
          {value?.toLocaleString()}
        </p>
      </div>

      <span className="text-sm font-medium text-gray-500">
        {type === "overall" ? null : type === "country" ? null : "tCO₂e"}
      </span>
    </div>
  );
}

export function CompanySummary({ company }: { company: Company }) {
  return (
    <div
      className="rounded-xl bg-white py-6 px-1 
    shadow-sm border border-gray-100"
    >
      <div className="">{company.name}</div>
    </div>
  );
}

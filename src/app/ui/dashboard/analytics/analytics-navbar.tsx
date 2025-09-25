"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const categories = [
  { key: "year", label: "연도별" },
  { key: "company", label: "회사별" },
  { key: "source", label: "소스별" },
];

export default function AnalyticsNavbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "year";

  const handleCategoryChange = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", category);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex space-x-8">
          <h1 className="text-4xl">Analytics</h1>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category.key
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

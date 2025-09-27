"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  ClockIcon,
  BuildingOfficeIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { key: "year", label: "By Year", icon: ClockIcon },
  { key: "company", label: "By Company", icon: BuildingOfficeIcon },
  { key: "source", label: "By Source", icon: CircleStackIcon },
];

interface AnalyticsNavbarProps {
  selectedCategory: string;
}

export default function AnalyticsNavbar({ selectedCategory }: AnalyticsNavbarProps) {
  const router = useRouter();

  const handleCategoryChange = useCallback(
    (category: string) => {
      const params = new URLSearchParams();
      params.set("category", category);
      router.push(`?${params.toString()}`);
    },
    [router]
  );

  return (
    <nav className="bg-white border-b border-gray-200 mb-3">
      <div className="flex px-4 py-3 space-x-8">
        <h1 className="text-2xl">Analytics</h1>
        <div className="flex-1 grid grid-cols-8 gap-5">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`flex items-center gap-2 px-3 py-2 
                text-sm font-medium rounded-md transition-colors 
                w-40 ${
                  selectedCategory === category.key
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

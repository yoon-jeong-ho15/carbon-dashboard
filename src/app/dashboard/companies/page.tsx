"use client";

import CompanyList from "@/app/ui/dashboard/company/company-list";

export default function Page() {
  return (
    <div className="shadow rounded-lg h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Companies</h1>
        <CompanyList />
      </div>
    </div>
  );
}

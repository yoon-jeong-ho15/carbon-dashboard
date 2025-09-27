"use client";

import { useMemo } from "react";
import { usePosts } from "@/app/hooks/usePosts";
import { useCompanies } from "@/app/hooks/useCompanies";
import { WriteReport } from "@/app/ui/dashboard/reports/button";
import ReportItem from "@/app/ui/dashboard/reports/report";

export default function Page() {
  const { data: posts, isLoading, error } = usePosts();
  const { data: companies } = useCompanies();

  const companiesMap = useMemo(() =>
    new Map(companies?.map(c => [c.id, c]) || []),
    [companies]
  );

  if (isLoading) {
    return (
      <div className="shadow rounded-lg h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading reports...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shadow rounded-lg h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-8 text-red-500">
            Error loading reports: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow rounded-lg h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <WriteReport />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                  Title
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                  Company
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                  Content
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts?.map((post) => (
                <ReportItem key={post.id} post={post} companiesMap={companiesMap} />
              ))}
            </tbody>
          </table>
        </div>
        {posts?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reports available
          </div>
        )}
      </div>
    </div>
  );
}

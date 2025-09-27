"use client";

import { useCompanies } from "../../../hooks/useCompanies";

export default function CompanyList() {
  const { data: companies, isLoading, error, refetch } = useCompanies();

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading companies...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Company Name
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Country
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Total Emissions
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Company ID
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {companies?.map((company) => {
            const totalEmissions = company.emissions?.reduce((sum, emission) => sum + emission.emissions, 0) || 0;

            return (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{company.name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">{company.country}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">{totalEmissions.toLocaleString()} tCO₂e</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-500 text-sm font-mono">{company.id}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {companies?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No companies available
        </div>
      )}
    </div>
  );
}

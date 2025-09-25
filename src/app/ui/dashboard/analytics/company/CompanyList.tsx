"use client";

import { useCompanies, useCompanyTotals } from "../../../../hooks/useCompanies";

export default function CompanyList() {
  const { data: companies, isLoading, error, refetch } = useCompanies();

  if (isLoading) {
    return <div>Loading companies...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Companies</h2>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {companies?.map((company) => (
          <li key={company.id}>
            <h3>{company.name}</h3>
            <p>Country: {company.country}</p>
            <p>Emissions records: {company.emissions.length}</p>
            <details>
              <summary>View emissions</summary>
              <ul>
                {company.emissions.map((emission, index) => (
                  <li key={index}>
                    {emission.yearMonth}: {emission.emissions} tons (
                    {emission.source})
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

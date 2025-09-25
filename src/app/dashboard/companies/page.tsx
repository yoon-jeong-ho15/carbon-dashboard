import CompanyList from "@/app/ui/dashboard/analytics/company/CompanyList";

export default function Page() {
  return (
    <div className="shadow rounded-lg h-full">
      <h1 className="text-4xl">Companies</h1>
      <CompanyList />
    </div>
  );
}

import AnalyticsNavbar from "@/app/ui/dashboard/analytics/analytics-navbar";
import CompanyAnalytics from "@/app/ui/dashboard/analytics/company-analytics";
import SourceAnalytics from "@/app/ui/dashboard/analytics/source-analytics";
import YearAnalytics from "@/app/ui/dashboard/analytics/year-analytics";

export default async function Page(props: {
  searchParams?: Promise<{
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams?.category || "year";

  const renderContent = () => {
    switch (selectedCategory) {
      case "year":
        return <YearAnalytics />;
      case "company":
        return <CompanyAnalytics />;
      case "source":
        return <SourceAnalytics />;
    }
  };

  return (
    <div className="shadow rounded-lg h-full flex flex-col">
      <AnalyticsNavbar />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}

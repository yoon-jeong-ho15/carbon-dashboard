import InfoCards from "@/app/ui/dashboard/info-cards";
import TotalPieCharts from "@/app/ui/dashboard/total-piecharts";
import YearlyTrend from "@/app/ui/dashboard/yealy-trend";

export default function Page() {
  return (
    <div className="border rounded-lg h-full flex flex-col">
      <div
        className="bg-gray-50/50 rounded m-2 p-2
        border border-gray-200"
      >
        <div className="grid gap-4 grid-cols-5">
          <div className="">
            <div>logo</div>
            <p>Acme Corp.</p>
            <p>2021 - 2025</p>
          </div>
          <InfoCards />
        </div>
      </div>

      <div
        className="bg-gray-50/50 rounded m-2 p-2
        border border-gray-200
        flex-1 flex flex-col"
      >
        <div className="flex-1">
          <YearlyTrend />
        </div>

        <div className="h-60 grid gap-3 grid-cols-4">
          <TotalPieCharts />
        </div>
      </div>
    </div>
  );
}

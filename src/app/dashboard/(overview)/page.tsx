import InfoCards from "@/app/ui/dashboard/info-cards";
import YearlyTrend from "@/app/ui/dashboard/yealy-trend";

export default function Page() {
  return (
    <div className="border rounded-lg h-full">
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
        border border-gray-200"
      >
        <YearlyTrend />
      </div>
    </div>
  );
}

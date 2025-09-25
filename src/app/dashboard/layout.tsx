import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="min-w-50">
        {/* flex-none */}
        <SideNav />
      </div>
      <div className="flex-1 py-4 px-5">{children}</div>
    </div>
  );
}

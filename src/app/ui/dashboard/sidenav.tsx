import { GlobeAsiaAustraliaIcon, HomeIcon } from "@heroicons/react/24/outline";
import NavLinks from "./navlinks";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div
        className="
      mb-2 flex justify-center items-center h-30 
      rounded-md gap-2 bg-emerald-600 
       text-gray-100"
      >
        <GlobeAsiaAustraliaIcon className="size-15" />
        <div className="flex flex-col">
          <span className="text-xl">Hana</span>
          <span className="">Dashboard</span>
        </div>
      </div>
      <div className="flex grow flex-col">
        <NavLinks />
        <div className="h-full w-full grow rounded-md bg-gray-50"></div>
        <Link
          href="/"
          className={`flex h-[48px] grow items-center gap-2 
              rounded-md bg-gray-50 text-sm hover:bg-green-100
               hover:text-green-700 flex-none justify-start p-2 px-5 my-1
              `}
        >
          <HomeIcon className="size-6" />
          <span>Back to Main</span>
        </Link>
      </div>
    </div>
  );
}

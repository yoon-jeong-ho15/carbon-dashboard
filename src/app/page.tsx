import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="
    font-sans grid grid-rows-[20px_1fr_20px] 
    items-center justify-items-center 
    min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <div className="text-6xl">Welcome, ACME</div>
      <Link
        href="/dashboard"
        className="
        flex items-center rounded-lg
        bg-emerald-500 px-6 py-3 text-lg
        font-medium text-white
        hover:bg-emerald-400 group"
      >
        <span className=" transition-transform group-hover:-translate-x-1">
          Dashboard
        </span>
        <ArrowRightIcon className="size-6 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

"use client";

import {
  BuildingOffice2Icon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Overview", href: "/dashboard", icon: ChartBarIcon },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: MagnifyingGlassCircleIcon,
  },
  {
    name: "Companies",
    href: "/dashboard/companies",
    icon: BuildingOffice2Icon,
  },
  { name: "Reports", href: "/dashboard/reports", icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center gap-2
              rounded-md bg-gray-50 text-sm hover:bg-green-100
               hover:text-green-700 flex-none justify-start p-2 px-5 my-1
              ${
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href))
                  ? "bg-green-100 text-green-700"
                  : ""
              }`}
          >
            {/* hidden md:block */}
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function WriteReport() {
  return (
    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium ">
      <Link href={"reports/write"} className="flex">
        <PencilSquareIcon className="size-6 mr-1" />
        <span>Write</span>
      </Link>
    </button>
  );
}

export function EditReport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/reports/${id}/edit`}
      className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
    >
      Edit Report
    </Link>
  );
}

export function Cancle() {
  return (
    <Link
      href="/dashboard/reports"
      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
    >
      Close
    </Link>
  );
}

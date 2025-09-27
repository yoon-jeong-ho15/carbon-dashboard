"use client";

import { useParams } from "next/navigation";
import { usePosts } from "@/app/hooks/usePosts";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Cancle, EditReport } from "@/app/ui/dashboard/reports/button";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: posts, isLoading, error } = usePosts();

  const post = posts?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="shadow rounded-lg h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading report...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shadow rounded-lg h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-8 text-red-500">
            Error loading report: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="shadow rounded-lg h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-8 text-gray-500">
            Report not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow rounded-lg h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Reports
          </Link>
        </div>

        {/* Report Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Title
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
              {post.title}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Company ID
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
                {post.resourceUid}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Date
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
                {post.dateTime}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Content
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[120px] whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Report ID
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 font-mono text-sm text-gray-500">
              {post.id}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <Cancle />
          <EditReport id={post.id} />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function ReportItem({
  post,
  companiesMap
}: {
  post: any;
  companiesMap: Map<string, any>;
}) {
  const company = companiesMap.get(post.resourceUid);
  const companyName = company?.name || post.resourceUid;

  return (
    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <Link
          href={`/dashboard/reports/${post.id}`}
          className="font-medium text-gray-900 hover:text-green-700 transition-colors"
        >
          {post.title}
        </Link>
      </td>
      <td className="py-4 px-4">
        <div className="text-gray-600">{companyName}</div>
      </td>
      <td className="py-4 px-4">
        <div className="text-gray-600">{post.dateTime}</div>
      </td>
      <td className="py-4 px-4">
        <div className="text-gray-600 max-w-xs truncate">{post.content}</div>
      </td>
    </tr>
  );
}

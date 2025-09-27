"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanies } from "@/app/hooks/useCompanies";
import { createOrUpdatePost } from "@/app/lib/api";

export default function Page() {
  const router = useRouter();
  const { data: companies } = useCompanies();
  const [formData, setFormData] = useState({
    title: "",
    resourceUid: "",
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 로딩 테스트용 - 3초 지연
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 에러 테스트용
      throw new Error("Test error message");

      await createOrUpdatePost({
        title: formData.title,
        resourceUid: formData.resourceUid,
        dateTime: `${formData.year}-${formData.month}`,
        content: formData.content,
      });

      router.push("/dashboard/reports");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="shadow rounded-lg h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Write Report
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 입력칸 */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter report title"
            />
          </div>

          {/* 회사 선택칸 */}
          <div>
            <label
              htmlFor="resourceUid"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Company
            </label>
            <select
              id="resourceUid"
              name="resourceUid"
              value={formData.resourceUid}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a company</option>
              {companies?.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* 연도와 월 선택칸 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Month
              </label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {months.map((month) => (
                  <option key={month} value={month.toString().padStart(2, "0")}>
                    {month.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 내용 입력칸 */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
              placeholder="Enter report content"
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/reports")}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

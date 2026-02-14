"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPreviewData(data);
    setLoading(false);
  };

  const handleGenerateInsights = async () => {
    if (!previewData) return;

    setInsightsLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/generate-insights`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: previewData.filename,
          dataset_summary: previewData.dataset_summary,
        }),
      },
    );

    const data = await res.json();
    setInsights(data.insights);
    setInsightsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header + Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">CSV Insights Dashboard</h1>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/reports")}
              className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded"
            >
              Go to Report
            </button>

            <button
              onClick={() => router.push("/status")}
              className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded"
            >
              Go to Status
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4 block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700"
          />

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Preview Section */}
        {previewData && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
            <div className="mb-6">
              <p className="text-lg font-semibold">{previewData.filename}</p>
              <div className="text-sm text-gray-400 mt-2 space-x-4">
                <span>Rows: {previewData.row_count}</span>
                <span>Columns: {previewData.column_count}</span>
              </div>
            </div>

            <div className="overflow-auto border border-gray-700 rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    {previewData.columns.map((col: any) => (
                      <th
                        key={col.name}
                        className="px-3 py-2 text-left border-b border-gray-700"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.preview.map((row: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-gray-800 transition"
                    >
                      {previewData.columns.map((col: any) => (
                        <td key={col.name} className="px-3 py-2">
                          {row[col.name]?.toString() || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Insights Button */}
            <div className="mt-6">
              <button
                onClick={handleGenerateInsights}
                disabled={insightsLoading}
                className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded disabled:opacity-50"
              >
                {insightsLoading ? "Generating..." : "Generate Insights"}
              </button>
            </div>
          </div>
        )}

        {/* Insights Section */}
        {insights && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 whitespace-pre-wrap">
            <h2 className="text-xl font-bold mb-4">Insights Report</h2>
            <div className="text-gray-200 leading-relaxed">{insights}</div>
          </div>
        )}
      </div>
    </div>
  );
}

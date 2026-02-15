"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportDetail = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}`,
      );
      const data = await res.json();
      setSelectedReport(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Recent Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - list */}
        <div className="space-y-4">
          {loading && <div className="text-gray-400">Loading reports...</div>}

          {!loading && reports.length === 0 && (
            <div className="text-gray-400">No reports found.</div>
          )}

          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => fetchReportDetail(report.id)}
              className="border border-gray-700 bg-gray-900 p-5 rounded-lg cursor-pointer transition hover:bg-gray-800 hover:border-gray-500"
            >
              <p className="text-lg font-semibold">{report.filename}</p>

              <p className="text-sm text-gray-400 mt-1">
                Report ID: {report.id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(report.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Right side - detail */}
        <div className="border border-gray-700 bg-gray-900 rounded-lg p-6 min-h-[300px]">
          {selectedReport ? (
            <>
              <h2 className="text-xl font-bold mb-2">
                Report #{selectedReport.id}
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                File: {selectedReport.filename}
              </p>

              <button
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${selectedReport.id}/export`,
                    "_blank",
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded mb-6"
              >
                Download Markdown
              </button>

              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                {selectedReport.summary}
              </div>
            </>
          ) : (
            <div className="text-gray-400 flex items-center justify-center h-full">
              Select a report to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

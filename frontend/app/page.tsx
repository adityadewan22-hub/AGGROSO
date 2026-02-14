"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPreviewData(data);
    setLoading(false);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">CSV Insights Dashboard</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {loading && <p className="mt-4">Uploading...</p>}

      {previewData && (
        <div className="mt-6">
          <p>
            <strong>Filename:</strong> {previewData.filename}
          </p>
          <p>
            <strong>Rows:</strong> {previewData.row_count}
          </p>
          <p>
            <strong>Columns:</strong> {previewData.column_count}
          </p>

          <div className="overflow-auto mt-4 border">
            <table className="table-auto border-collapse border w-full">
              <thead>
                <tr>
                  {previewData.columns.map((col: any) => (
                    <th key={col.name} className="border px-2 py-1">
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.preview.map((row: any, index: number) => (
                  <tr key={index}>
                    {previewData.columns.map((col: any) => (
                      <td key={col.name} className="border px-2 py-1">
                        {row[col.name]?.toString() || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

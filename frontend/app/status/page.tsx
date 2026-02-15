"use client";

import { useEffect, useState } from "react";

type StatusResponse = {
  api: string;
  database: string;
  llm: string;
  uptime_seconds: number;
  timestamp: string;
};

export default function StatusPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    let slowTimer: NodeJS.Timeout;

    const fetchStatus = async () => {
      try {
        // If backend takes longer than 10s, show warming message
        slowTimer = setTimeout(() => {
          setSlow(true);
        }, 10000);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/status`,
        );

        if (!res.ok) throw new Error("Backend error");

        const data: StatusResponse = await res.json();
        setStatus(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        clearTimeout(slowTimer);
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">System Status</h1>

      {/* Loading */}
      {loading && (
        <div className="bg-blue-900/40 border border-blue-600 text-blue-300 p-4 rounded">
          Checking backend status...
        </div>
      )}

      {/* Slow (cold start) */}
      {slow && loading && (
        <div className="bg-yellow-900/40 border border-yellow-600 text-yellow-300 p-4 rounded mt-4">
          Backend is starting up (Render free tier cold start). This may take
          ~20 seconds.
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-red-900/40 border border-red-600 text-red-400 p-4 rounded mt-4">
          Backend appears to be unavailable.
        </div>
      )}

      {/* Success */}
      {status && (
        <div className="space-y-4 mt-6">
          <StatusItem label="API" value={status.api} />
          <StatusItem label="Database" value={status.database} />
          <StatusItem label="LLM" value={status.llm} />
          <StatusItem label="Timestamp" value={status.timestamp} />
        </div>
      )}
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  const color =
    value === "ok"
      ? "text-green-600"
      : value === "error"
        ? "text-red-600"
        : "text-gray-600";

  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className={color}>{value}</span>
    </div>
  );
}

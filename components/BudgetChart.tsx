"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SummaryItem {
  category: string;
  budgeted: number;
  actual: number;
}

export default function BudgetChart({ month }: { month: string }) {
  const [data, setData] = useState<SummaryItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/budgets/summary", {
          method: "POST",
          body: JSON.stringify({ month }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to load budget summary");
        console.error(err);
      }
    };

    fetchSummary();
  }, [month]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p className="text-gray-400">No data available for selected month.</p>;

  return (
    <div className="mt-6 p-4 border rounded-xl bg-zinc-900">
      <h2 className="text-lg font-bold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

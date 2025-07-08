
"use client";

import { useEffect, useState } from "react";

interface SummaryItem {
  category: string;
  budgeted: number;
  actual: number;
}

export default function SpendingInsights({ month }: { month: string }) {
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
        setError("Failed to load spending insights");
      }
    };

    fetchSummary();
  }, [month]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p className="text-gray-400">No data available.</p>;

  const getMessage = (item: SummaryItem) => {
    const diff = Math.abs(item.actual - item.budgeted);
    if (item.actual > item.budgeted) {
      return `🔴 Overspent in ${item.category} by ₹${diff}`;
    } else if (item.actual < item.budgeted) {
      return `🟢 Under budget in ${item.category} by ₹${diff}`;
    } else {
      return `⚪ Met the budget exactly in ${item.category}`;
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-xl bg-zinc-900">
      <h2 className="text-lg font-bold mb-4">Spending Insights</h2>
      <ul className="space-y-2 text-sm text-gray-200">
        {data.map((item, idx) => (
          <li key={idx} className="bg-black rounded p-2">
            {getMessage(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

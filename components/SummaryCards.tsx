"use client";

import { useEffect, useState } from "react";

interface Transaction {
  amount: number;
  category: string;
  date: string;
}

export default function SummaryCards({ refresh }: { refresh: number }) {
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [topCategory, setTopCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const transactions: Transaction[] = await res.json();

      // Total
      const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);
      setTotal(totalAmount);

      // Recent
      setRecent(transactions.slice(0, 3));

      // Top category
      const catCount: Record<string, number> = {};
      transactions.forEach((t) => {
        catCount[t.category] = (catCount[t.category] || 0) + t.amount;
      });

      const top = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
      setTopCategory(top?.[0] || "-");
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
      <div className="bg-black p-3 rounded-xl shadow border">
        <h4 className="text-sm text-gray-500">Total Expenses</h4>
        <p className="text-xl font-bold">₹{total.toLocaleString()}</p>
      </div>
      <div className="bg-black p-3 rounded-xl shadow border">
        <h4 className="text-sm text-gray-500">Top Category</h4>
        <p className="text-xl font-bold">{topCategory}</p>
      </div>
      <div className="bg-black p-3 rounded-xl shadow border sm:col-span-2">
        <h4 className="text-sm text-gray-500">Recent</h4>
        <ul className="text-sm text-white lex flex-col gap-1">
          {recent.map((t, i) => (
            <li key={i} className="whitespace-nowrap">
              {t.category}: ₹{t.amount} on {new Date(t.date).toLocaleDateString()}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

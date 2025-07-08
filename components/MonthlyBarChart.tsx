'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
}

export default function MonthlyBarChart({ refresh }: { refresh: number }) {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions');
      const transactions: Transaction[] = await res.json();

      const monthlyTotals: { [key: string]: number } = {};

      transactions.forEach((t) => {
       // const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
       const month = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });

        monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
      });

      const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));
      setData(chartData);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  _id: string;
  amount: number;
  category: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export default function CategoryPieChart({ refresh }: { refresh: number }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions');
      const transactions: Transaction[] = await res.json();

      const categoryTotals: Record<string, number> = {};

      transactions.forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

      const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
      setData(chartData);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

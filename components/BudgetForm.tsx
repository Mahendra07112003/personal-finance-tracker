"use client";

import { useState } from "react";

export default function BudgetForm({ onBudgetSubmit }: { onBudgetSubmit: () => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        body: JSON.stringify({ category, month, amount: +amount }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Unknown error");
      }

      setSuccessMsg(data.message || "Budget saved");
      setCategory("");
      setAmount("");
      onBudgetSubmit();
    } catch (err: any) {
      setError(err.message || "Failed to save budget");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl space-y-4 bg-zinc-900"
    >
      <h2 className="text-lg font-bold">Set Category Budget</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full border p-2 rounded-md bg-black"
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded-md"
        required
      />

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="w-full border p-2 rounded-md"
        required
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-black border text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Save Budget"}
      </button>
    </form>
  );
  
}

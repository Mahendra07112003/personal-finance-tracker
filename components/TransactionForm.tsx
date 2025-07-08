
"use client";


import { ITransaction } from "@/lib/models";
import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category?: string;
}

interface TransactionFormProps {
  onAdd: () => void;
  editingTransaction?: ITransaction | null;
  onClearEdit: () => void;
}


export default function TransactionForm({onAdd, editingTransaction,onClearEdit,}: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


   useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      // setDate(editingTransaction.date.slice(0, 10)); // format for input
      setDate(new Date(editingTransaction.date).toISOString().slice(0, 10));

      setCategory(editingTransaction.category || "");
    }
  }, [editingTransaction]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

     const payload = {
      amount: +amount,
      description,
      date,
      category,
    };


    try {
    //   const res = await fetch("/api/transactions", {
    //     method: "POST",
    //     body: JSON.stringify({ amount: +amount, description, date, category }),
    //     headers: { "Content-Type": "application/json" },
    //   });
      const res = await fetch(
        editingTransaction
          ? `/api/transactions/${editingTransaction._id}` // PUT (edit)
          : "/api/transactions", // POST (new)
        {
          method: editingTransaction ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      setAmount("");
      setDescription("");
      setDate("");
      setCategory("");
      onAdd();
       onClearEdit();
    } catch {
      setError("Failed to add transaction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl bg-black shadow"
    >
     

       <h2 className="text-xl font-semibold">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Description"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded-md"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded-md bg-black"
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
       
       <div className="flex gap-2">
      <button
        type="submit"
        disabled={submitting}
        className=" bg-black border  text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {/* {submitting ? "Adding..." : "Add"} */}
         {submitting
            ? editingTransaction
              ? "Updating..."
              : "Adding..."
            : editingTransaction
            ? "Update"
            : "Add"}

      </button>
       {editingTransaction && (
          <button
            type="button"
            onClick={onClearEdit}
            className="border px-4 py-2 rounded-md text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

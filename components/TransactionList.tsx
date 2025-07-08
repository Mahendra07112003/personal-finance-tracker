// // 'use client';

// // import { useEffect, useState } from 'react';

// // interface Transaction {
// //   _id: string;
// //   amount: number;
// //   description: string;
// //   date: string;
// // }

// // export default function TransactionList({ refresh }: { refresh: number }) {
// //   const [transactions, setTransactions] = useState<Transaction[]>([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const res = await fetch('/api/transactions');
// //       const data = await res.json();
// //       setTransactions(data);
// //     };
// //     fetchData();
// //   }, [refresh]);

// //   return (
// //     <div className="mt-6">
// //       <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
// //       <ul className="space-y-2">
// //         {transactions.map((t) => (
// //           <li key={t._id} className="border px-4 py-2 rounded-md">
// //             <div>₹{t.amount}</div>
// //             <div className="text-sm text-gray-600">{t.description || '-'}</div>
// //             <div className="text-xs text-gray-400">{new Date(t.date).toDateString()}</div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// "use client";
// import { Trash } from 'lucide-react';

// import { useEffect, useState } from "react";

// interface Transaction {
//   _id: string;
//   amount: number;
//   description: string;
//   date: string;
// }

// const handleDelete = async (id: string) => {
//   try {
//     await fetch(`/api/transactions/${id}`, {
//       method: 'DELETE',
//     });
//     onRefresh(); // or refetch transactions if you're using SWR
//   } catch (err) {
//     console.error('Delete failed', err);
//   }
// };
// export default function TransactionList({ refresh }: { refresh: number }) {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         const res = await fetch("/api/transactions");
//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         setTransactions(data);
//       } catch {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [refresh]);

//   if (loading)
//     return <p className="mt-4 text-gray-500">Loading transactions...</p>;
//   if (error)
//     return <p className="mt-4 text-red-600">Failed to load transactions.</p>;
//   if (transactions.length === 0)
//     return <p className="mt-4 text-gray-400">No transactions found.</p>;

//   return (
//     <div className="mt-6 ">
//       <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
//       <ul className="space-y-2 ">
//         {transactions.map((t) => (

//           <li key={t._id} className="border px-4 py-2 rounded-md">
//             <div className="font-medium">₹{t.amount.toLocaleString()}</div>
//             <div className="text-m text-gray-600">{t.description || "-"}</div>
//             <div className="text-sm text-gray-400">
//               {new Date(t.date).toLocaleDateString()}
//             </div>
//             <div > <button
//             className="text-red-500 hover:underline ml-4"
//             onClick={() => handleDelete(transaction._id)}
//           >
//             <Trash size={16} />
//           </button></div>
//           </li>
//         ))}

//       </ul>
//     </div>
//   );
// }
// function onRefresh() {
//   throw new Error('Function not implemented.');
// }

"use client";
//import { ITransaction } from "@/lib/models";
import { Trash, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ITransaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category?: string; // optional, for Stage 2+
}

export default function TransactionList({
  refresh,
  onRefresh,
  onEdit,
}: {
  refresh: number;
  onRefresh: () => void;
   onEdit: (tx: ITransaction) => void;
}) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTransactions(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      onRefresh(); // triggers parent refreshKey++ to re-fetch
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading)
    return <p className="mt-4 text-gray-500">Loading transactions...</p>;
  if (error)
    return <p className="mt-4 text-red-600">Failed to load transactions.</p>;
  if (transactions.length === 0)
    return <p className="mt-4 text-gray-400">No transactions found.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t._id}
            className="border px-4 py-2 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="font-medium">₹{t.amount.toLocaleString()}</div>
              <div className="text-m text-gray-600">{t.description || "-"}</div>
              <div className="text-sm text-gray-400">
                {new Date(t.date).toLocaleDateString()}
              </div>
            </div>
            <div  className="flex gap-2 items-center">
            <button
              onClick={() => onEdit(t)} // Call parent with full transaction
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil size={18} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(t._id)}
              
            >
              <Trash size={16} />
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

//app/api/budgets/summary/route.ts
import { connectToDB } from "@/lib/db";
import Budget from "@/lib/Budget";
import { Transaction } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { month } = await req.json(); // Expecting 'YYYY-MM'

    // Fetch all budgets for that month
    const budgets = await Budget.find({ month });

    // Fetch all transactions for that month
    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1); // next month start

    const transactions = await Transaction.find({
      date: { $gte: start, $lt: end },
    });

    // Group actual expenses by category
    const actualsMap: { [key: string]: number } = {};
    for (const tx of transactions) {
      const cat = tx.category || "Uncategorized";
      actualsMap[cat] = (actualsMap[cat] || 0) + tx.amount;
    }

    // Combine budgets and actuals
    const summary = budgets.map((b) => ({
      category: b.category,
      budgeted: b.amount,
      actual: actualsMap[b.category] || 0,
    }));

    return NextResponse.json(summary);
  } catch (err) {
    console.error("Budget Summary Error:", err);
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}

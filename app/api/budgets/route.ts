// app/api/budgets/route.ts

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Budget from "@/lib/Budget";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { category, month, amount } = await req.json();

    const existing = await Budget.findOne({ category, month });
    if (existing) {
      existing.amount = amount;
      await existing.save();
      return NextResponse.json(
        { success: true, message: "Budget updated" },
        { status: 200 }
      );
    }

    const newBudget = new Budget({ category, month, amount });
    await newBudget.save();
    return NextResponse.json(
      { success: true, message: "Budget created" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Budget POST Error:", err);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

import { connectToDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction);
}
    
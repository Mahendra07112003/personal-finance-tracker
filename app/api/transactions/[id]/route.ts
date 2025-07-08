import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Transaction } from '@/lib/models';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = params;
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = context.params;
    const data = await req.json();
    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
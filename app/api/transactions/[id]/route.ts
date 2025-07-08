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
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // await connectDB();
  const data = await req.json();
  const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}


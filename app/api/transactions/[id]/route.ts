import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import type { NextApiRequestContext } from 'next';

export async function DELETE(
  req: NextRequest,
  context: NextApiRequestContext
) {
  try {
    await connectToDB();
    const { id } =  await context.params;
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: NextApiRequestContext
) {
  try {
    await connectToDB();
    const { id } = await context.params;
    const data = await req.json();
    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

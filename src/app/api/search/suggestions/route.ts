import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    await dbConnect();
    const suggestions = await Product.find(
      { title: { $regex: q, $options: 'i' } },
      { title: 1, slug: 1 }
    ).limit(5);

    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}

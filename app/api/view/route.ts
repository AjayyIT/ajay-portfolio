import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST() {
  try {
    // Increments the counter by 1 every time this is called
    const views = await redis.incr('portfolio_views');
    return NextResponse.json({ views });
  } catch (error) {
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
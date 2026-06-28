import { NextResponse } from 'next/server';
import Redis from 'ioredis';

export async function GET() {
  try {
    // 1. Connect using the Vercel environment variable
    const redis = new Redis(process.env.REDIS_URL || '');

    // 2. Write a piece of data to your database
    await redis.set('portfolio_status', 'Connection Successful! Ajay is live.');

    // 3. Read it back
    const value = await redis.get('portfolio_status');

    return NextResponse.json({ 
      success: true, 
      message: "Database is perfectly connected!", 
      saved_data: value 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong." });
  }
}
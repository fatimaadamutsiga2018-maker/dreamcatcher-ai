import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Auth route is working',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  });
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || request.nextUrl.origin;
  const authTrustHost = process.env.AUTH_TRUST_HOST;

  return NextResponse.json({
    baseUrl,
    origin: request.nextUrl.origin,
    host: request.headers.get('host'),
    xForwardedHost: request.headers.get('x-forwarded-host'),
    xForwardedProto: request.headers.get('x-forwarded-proto'),
    authTrustHost,
    computedCallbackUrl: `${baseUrl}/api/auth/callback/google`,
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
      VERCEL_URL: process.env.VERCEL_URL,
    }
  });
}

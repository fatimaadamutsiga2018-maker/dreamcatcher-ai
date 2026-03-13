import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

const allowedOrigins = [
  'https://www.dreamcatcherai.us',
  'https://dreamcatcherai.us',
  'https://dreamcatcher-ai-nine.vercel.app',
];

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  const isAllowed = allowedOrigins.includes(origin);
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (isAllowed) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function GET(request: Request) {
  const response = await authGET(request);
  const corsHeaders = getCorsHeaders(request);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function POST(request: Request) {
  const response = await authPOST(request);
  const corsHeaders = getCorsHeaders(request);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [cookies, setCookies] = useState<string>("");

  useEffect(() => {
    // Get all cookies
    const allCookies = document.cookie;
    setCookies(allCookies || "No cookies found");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <h1 className="text-2xl font-bold mb-6 text-violet-400">Auth Debug Page</h1>

      <div className="space-y-6 max-w-2xl">
        {/* Session Status */}
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Session Status:</h2>
          <p className={`text-sm ${status === 'authenticated' ? 'text-green-400' : status === 'loading' ? 'text-yellow-400' : 'text-red-400'}`}>
            {status === 'authenticated' ? '✅ Authenticated' : status === 'loading' ? '⏳ Loading...' : '❌ Unauthenticated'}
          </p>
        </div>

        {/* Session Data */}
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Session Data:</h2>
          <pre className="text-xs text-green-400 overflow-auto bg-black p-2 rounded">
            {session ? JSON.stringify(session, null, 2) : 'null'}
          </pre>
        </div>

        {/* Cookies */}
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Cookies:</h2>
          <pre className="text-xs text-blue-400 overflow-auto bg-black p-2 rounded break-all">
            {cookies}
          </pre>
        </div>

        {/* Environment Info */}
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Environment:</h2>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>URL: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</li>
            <li>NextAuth URL should be: https://www.dreamcatcherai.us</li>
          </ul>
        </div>

        {/* Test Links */}
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Test Links:</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/api/auth/signin" className="text-violet-400 hover:underline">
                /api/auth/signin (NextAuth sign in page)
              </a>
            </li>
            <li>
              <a href="/api/auth/session" className="text-violet-400 hover:underline">
                /api/auth/session (Session JSON)
              </a>
            </li>
            <li>
              <a href="/api/auth/csrf" className="text-violet-400 hover:underline">
                /api/auth/csrf (CSRF token)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function TestPage() {
  // Fetch session directly from API
  const sessionResponse = await fetch(`${process.env.NEXTAUTH_URL || 'https://www.dreamcatcherai.us'}/api/auth/session`, {
    cache: 'no-store',
  });
  const session = await sessionResponse.json();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <h1 className="text-2xl font-bold mb-6 text-violet-400">Session Test Page</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Session from API:</h2>
          <pre className="text-xs text-green-400 overflow-auto bg-black p-2 rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-2 text-amber-400">Environment:</h2>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || 'not set'}</li>
            <li>NODE_ENV: {process.env.NODE_ENV || 'not set'}</li>
          </ul>
        </div>

        <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-400">
            {session?.user ? `✅ Logged in as ${session.user.email}` : '❌ Not logged in'}
          </p>
        </div>
      </div>
    </div>
  );
}

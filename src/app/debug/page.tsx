export default async function DebugPage() {
  const session = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/session`, {
    cache: 'no-store'
  }).then(res => res.json());

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>

      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Session Data:</h2>
          <pre className="text-sm text-green-400 overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Environment:</h2>
          <ul className="text-sm space-y-1">
            <li>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || 'not set'}</li>
            <li>NODE_ENV: {process.env.NODE_ENV || 'not set'}</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Cookies:</h2>
          <p className="text-sm text-yellow-400">
            Check browser Application tab → Cookies
          </p>
        </div>
      </div>
    </div>
  );
}

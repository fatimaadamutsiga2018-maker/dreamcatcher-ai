export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4 text-green-400">
        ✅ Test Page Works!
      </h1>
      <p className="text-gray-300">
        If you can see this page, the route is working correctly.
      </p>
      <p className="text-gray-400 mt-4">
        Current time: {new Date().toLocaleString()}
      </p>
    </div>
  );
}

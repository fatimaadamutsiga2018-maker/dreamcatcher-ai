import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Make Better <span className="text-amber-600">Choices</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every small choice shapes your life's direction. Get guidance on probability and timing
            to make decisions with greater confidence. Small choices build the big ones.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/assessment"
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors"
            >
              Start Energy Assessment
            </Link>
            <Link
              href="/hexagram"
              className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors"
            >
              Get Decision Guidance
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Energy Assessment</h3>
            <p className="text-gray-600">
              Understand your current energy state across mental clarity, physical vitality,
              life harmony, and growth momentum.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">☯️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Decision Guidance</h3>
            <p className="text-gray-600">
              Assess the probability and timing of your choices. Ancient wisdom helps you
              understand favorable conditions for action.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌊</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Energy Environment</h3>
            <p className="text-gray-600">
              Align with the natural rhythms of time and understand how today's
              energy supports your intentions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Guidance for reflection and inspiration. You are the final decision-maker.
          </p>
        </div>
      </footer>
    </div>
  );
}


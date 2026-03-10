import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog Coming Soon
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            We're working on bringing you insightful articles about decision-making,
            cosmic timing, and personal growth.
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium mb-12">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Under Development
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Our Tools
            </h2>
            <p className="text-gray-600 mb-6">
              While we prepare our blog, discover our decision-making tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                Energy Assessment
              </Link>
              <Link
                href="/hexagram"
                className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-colors"
              >
                Decision Guidance
              </Link>
              <Link
                href="/almanac"
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors"
              >
                Daily Activity Guide
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

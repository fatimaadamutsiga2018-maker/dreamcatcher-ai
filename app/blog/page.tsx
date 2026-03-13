import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

const categoryColors: Record<string, string> = {
  Timing: 'bg-blue-100 text-blue-700',
  Energy: 'bg-emerald-100 text-emerald-700',
  Alignment: 'bg-purple-100 text-purple-700',
  Guidance: 'bg-amber-100 text-amber-700',
  General: 'bg-gray-100 text-gray-700',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Insights & Guidance
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore timing, energy, and alignment — practical ideas to help
              you make better choices at better times.
            </p>
          </div>

          {/* Post Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || categoryColors.General}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.publishDate}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-xs text-gray-500">
                      <span>{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Blog content is coming soon
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We are preparing the first set of articles on timing, energy,
                and decision-making. Check back soon for new guidance.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Want to go deeper?
            </h2>
            <p className="text-gray-600 mb-6">
              Take our free Energy Assessment to discover your current state and
              get personalized guidance.
            </p>
            <Link
              href="/assessment"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

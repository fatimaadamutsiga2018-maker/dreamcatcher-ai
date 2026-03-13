import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import RecentComments from '@/components/blog/RecentComments';

const pillars = [
  { key: 'Timing', label: 'Timing', icon: '⏱', color: 'text-blue-700', bg: 'bg-blue-50', accent: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700', description: 'When you act matters more than how hard you try.' },
  { key: 'Energy', label: 'Energy', icon: '⚡', color: 'text-emerald-700', bg: 'bg-emerald-50', accent: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700', description: 'Understand and manage your daily energy cycles.' },
  { key: 'Alignment', label: 'Alignment', icon: '🎯', color: 'text-purple-700', bg: 'bg-purple-50', accent: 'bg-purple-600', badge: 'bg-purple-100 text-purple-700', description: 'Match your tasks to your peak states.' },
  { key: 'Guidance', label: 'Guidance', icon: '🧭', color: 'text-amber-700', bg: 'bg-amber-50', accent: 'bg-amber-600', badge: 'bg-amber-100 text-amber-700', description: "Make decisions you won't regret." },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Insights &amp; Guidance
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore timing, energy, and alignment — practical ideas to help
              you make better choices at better times.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => {
              const pillarPosts = posts.filter((p) => p.category === pillar.key);
              return (
                <div key={pillar.key} className={`rounded-2xl ${pillar.bg} p-6 flex flex-col`}>
                  {/* Pillar Header */}
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{pillar.icon}</span>
                    <h2 className={`text-xl font-bold ${pillar.color}`}>{pillar.label}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{pillar.description}</p>

                  {/* Articles */}
                  <div className="flex-1 space-y-3">
                    {pillarPosts.length > 0 ? (
                      pillarPosts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="group block bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <div className="bg-white/60 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-400 italic">Coming soon</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Comments */}
          <RecentComments />

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

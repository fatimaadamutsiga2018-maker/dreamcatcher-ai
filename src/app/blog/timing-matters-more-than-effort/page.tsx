
import type { Metadata } from "next";
import Link from "next/link";
import BlogBackground from "@/shared/components/blog/BlogBackground";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export const metadata: Metadata = {
  title: "It's Not That You're Not Working Hard — Dreamcatcher",
  description: "Effort has a cost. Timing decides whether that cost pays back. The case for strategic action over constant effort.",
  alternates: {
    canonical: "https://dreamcatcherai.us/blog/timing-matters-more-than-effort",
  },
  openGraph: {
    title: "It's Not That You're Not Working Hard — Dreamcatcher",
    description: "Effort has a cost. Timing decides whether that cost pays back. The case for strategic action over constant effort.",
    url: "https://dreamcatcherai.us/blog/timing-matters-more-than-effort",
    type: "article",
    publishedTime: "2025-01-12",
  },
};

export default function BlogPostPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <BlogBackground />
      <BlogNavigation backLink="/" backLabel="BACK" />

      <main className="relative z-10 mx-auto min-h-screen w-full max-w-2xl px-4 py-24">
        {/* Article Header */}
        <article>
          <div className="mb-8">
            <span className="text-[10px] tracking-wider text-violet-400/70 px-2 py-0.5 rounded bg-violet-500/5 border border-violet-400/20">
              CONCEPT
            </span>
            <span className="text-white/30 text-xs ml-3">JAN 12, 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
            It's Not That You're Not Working Hard — You're Just Pushing at the Wrong Time
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            Most people believe success comes from effort. But here's a quieter truth most never learn: Effort has a cost. Timing decides whether that cost pays back.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-violet-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <p className="text-white/70 font-serif leading-relaxed mb-6 text-lg">
                Most people believe success comes from effort.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                Work harder. Move faster. Don't stop.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                But here's a quieter truth most never learn:
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <p className="text-white/90 font-serif italic text-xl leading-relaxed">
                  Effort has a cost. Timing decides whether that cost pays back.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Notice the Pattern</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Have you noticed how some days, even small actions seem to work out?
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Emails get replies. Conversations flow. Decisions feel clear.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                And on other days, everything feels heavy — even simple tasks drain you.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                This isn't laziness. It's resistance.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Every System Has Rhythm</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Every system — your body, your mind, your environment — has moments of flow and moments of drag. When you push during high resistance, you burn energy without results. When you move with flow, progress feels lighter.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Dreamcatcher isn't about predicting the future. It's about helping you recognize when to push, when to pause, and when to simply hold steady.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Smartest Move</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed">
                  Sometimes the smartest move isn't doing more — it's choosing a better moment to act.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Effort always has a cost — but timing determines if it pays back</li>
                <li>Some days naturally support action; others create resistance</li>
                <li>Pushing during resistance burns energy without results</li>
                <li>Moving with flow makes progress feel lighter</li>
              </ul>
            </section>
          </div>
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Today
          </Link>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import NebulaBackground from "@/shared/components/dreamcatcher/NebulaBackground";
import { useState } from "react";

export default function BlogPostPage() {
  const [currentDate] = useState(new Date());

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <NebulaBackground date={currentDate} />

      {/* Top Right Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <svg className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs tracking-wider text-white/70 group-hover:text-white/90 transition-colors">BACK</span>
          </Link>
        </div>
      </nav>

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

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
            <span className="text-[10px] tracking-wider text-amber-400/70 px-2 py-0.5 rounded bg-amber-500/5 border border-amber-400/20">
              INSIGHT
            </span>
            <span className="text-white/30 text-xs ml-3">JAN 12, 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
            You Don't Need Confidence — You Need the Right Moment to Start
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            People wait for confidence before starting. But confidence doesn't come first. Momentum does. You might just be waiting for the right green light.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Confidence Trap</h2>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                People wait for confidence before starting.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                They wait to feel ready. They wait to feel sure. They wait to stop doubting.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-4">
                But confidence doesn't come first.
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <p className="text-white/90 font-serif italic text-xl leading-relaxed">
                  Momentum does.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Two Kinds of Days</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                There are days when starting feels heavy — every step costs willpower.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                And there are days when even imperfect action feels supported.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Those are starting days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">On the Right Day</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                On the right day, you don't need a perfect plan. You need a small step.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Send the message. Open the document. Make the call.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Dreamcatcher doesn't tell you what to start. It helps you recognize when starting will feel lighter instead of forced.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Green Light</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-4">
                  You're not behind.
                </p>
                <p className="text-white/90 font-serif text-lg leading-relaxed">
                  You might just be waiting for the right green light.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Confidence follows momentum, not the other way around</li>
                <li>Some days naturally support starting; others make it heavy</li>
                <li>On a starting day, you don't need a perfect plan</li>
                <li>You might not be behind — just waiting for the right moment</li>
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

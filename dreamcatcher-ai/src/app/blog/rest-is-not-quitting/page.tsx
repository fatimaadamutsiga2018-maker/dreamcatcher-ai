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
            Why Resting at the Right Time Is Not Quitting
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            We've been taught that stopping means falling behind. But there are days when pushing costs you more than it gives back. Rest is waiting for the slope to change.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Myth of Constant Progress</h2>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                We've been taught that stopping means falling behind.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                So when things don't move, we panic.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-6">
                We push harder. We force decisions. We blame ourselves.
              </p>
              <p className="text-white/70 font-serif leading-relaxed mb-4">
                But here's the uncomfortable truth:
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <p className="text-white/90 font-serif italic text-xl leading-relaxed">
                  There are days when pushing costs you more than it gives back.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Think of It Like Driving Uphill</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Think of it like driving uphill. You can floor the gas — but you'll burn fuel fast and go nowhere.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Rest isn't weakness. Rest is waiting for the slope to change.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">When Energy Is Low</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                When energy is low, clarity drops. Decisions become defensive. Actions feel heavy.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                That's not the time to judge yourself or your plan.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                It's the time to stop spending energy blindly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">What We've Forgotten</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-4">
                  Dreamcatcher reminds you of something we've forgotten:
                </p>
                <p className="text-white/90 font-serif text-lg leading-relaxed">
                  Not every day is designed for action. Some days are designed for recovery.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Intelligent Choice</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed">
                  And choosing not to push on those days is often the most intelligent decision you can make.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Pushing during resistance burns more than it produces</li>
                <li>Rest is not weakness — it's waiting for conditions to change</li>
                <li>Low energy days call for preservation, not judgment</li>
                <li>Choosing rest can be the most intelligent decision</li>
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

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
              SYSTEM
            </span>
            <span className="text-white/30 text-xs ml-3">JAN 08, 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
            Why Doing Nothing Can Be Rational
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            In low-leverage environments, restraint preserves optionality. The case for strategic pause as a legitimate decision.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-violet-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Bias Toward Action</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Most decision frameworks treat action as the default. Inaction registers as failure—a sign of paralysis, lack of courage, or missed opportunity.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                This bias serves environments where leverage is abundant and motion compounds. When conditions favor expansion, delay converts opportunity into measurable cost.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">When Leverage Inverts</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The calculus shifts in low-leverage environments. Expansion under resistance doesn't just fail to compound—it actively destroys value. Each unit of effort produces less than one unit of return.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Consider a startup burning runway during a market downturn. Accelerating marketing spend doesn't capture market share—it accelerates insolvency. The rational action isn't "do something different." It's "do nothing."
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Optionality as Asset</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Restraint in unfavorable conditions preserves optionality. Capital, attention, and credibility are finite. When invested into friction, they become unrecoverable.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Waiting is not passive. It is capital protection under resistance. The decision not to act is itself an allocation of resources—one that preserves capacity for future leverage.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The System, Not the Self</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The challenge is distinguishing rational restraint from fear-based avoidance. One preserves optionality; the other reflects discomfort with uncertainty.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Systematic evaluation provides clarity: What is the leverage environment? Does action compound or decay? What happens to resources deployed now versus later?
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                When the environment signals low leverage, inaction is not a character flaw. It is the correct strategic response.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Permission</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-4">
                  "Wait. Action today costs triple."
                </p>
                <p className="text-white/50 font-serif text-sm">
                  The system has already done the calculation. The permission is not to hesitate—it is to recognize that the cost of motion has exceeded the value of motion.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Action bias serves high-leverage environments</li>
                <li>Low leverage converts action into friction</li>
                <li>Restraint preserves optionality under resistance</li>
                <li>Inaction can be the correct strategic response</li>
              </ul>
            </section>
          </div>
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Decision Briefs
          </Link>
        </div>
      </main>
    </div>
  );
}

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
            <span className="text-white/30 text-xs ml-3">DEC 28, 2024</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
            The Speed of Clarity
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            Insight erodes when action is delayed. The case for rapid deployment during high-density windows.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Decay Curve</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Insight behaves like a radioactive isotope. It has a half-life. The moment clarity arrives, its value begins to decay.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                This decay is not just psychological—the emotional charge that makes insight compelling fades with time. The world changes while you wait. The window where the insight was valid closes.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                By the time you act on last month's clarity, you are executing against a world that no longer exists.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Density Window</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Insight does not arrive continuously. It comes in waves—influenced by the alignment between your internal state and external conditions. These waves create windows of high cognitive density.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                During these windows, patterns become visible. Connections form effortlessly. Solutions present themselves without forcing.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                The window is brief. The density fades. And if you have not deployed the insight into action, it is lost.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Planning Fallacy</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The standard advice: plan before you act. Think through the implications. Prepare for contingencies.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                This advice assumes that planning preserves value. In stable environments, it does. But during insight windows, planning destroys value.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                The time spent planning is time spent outside the density window. By the time planning completes, the insight has degraded. The conditions have shifted. The original clarity is gone—replaced by a theoretical reconstruction that lacks the visceral force of the original.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Act on Insight</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The architecture of response is simple:
              </p>
              <ul className="text-white/60 font-serif space-y-2 mb-4">
                <li>Recognize the density window as it arrives</li>
                <li>Deploy a minimal version of the insight immediately</li>
                <li>Adjust based on real feedback, not projected scenarios</li>
                <li>Extend or retract based on results, not planning</li>
              </ul>
              <p className="text-white/60 font-serif leading-relaxed">
                This preserves the value of clarity. Action taken while insight is fresh leverages the cognitive density that produced it. Feedback arrives while the original pattern is still fresh in your system.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Calibration Alternative</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Not all insights require immediate deployment. Some benefit from calibration.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The distinction: calibration preserves or increases clarity. Delay degrades it.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Testing a small version of your insight is calibration. Spending three weeks perfecting a plan while the insight fades is degradation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Permission</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-4">
                  "Act on insight. This window is brief."
                </p>
                <p className="text-white/50 font-serif text-sm">
                  The system is not encouraging impulsiveness. It is acknowledging the temporal nature of clarity. When insight arrives, the environment has aligned to make that insight actionable now—not later.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Insight decays from the moment it arrives</li>
                <li>Density windows are brief and cyclical</li>
                <li>Planning during the window destroys more value than delay</li>
                <li>Deploy immediately, calibrate based on results</li>
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

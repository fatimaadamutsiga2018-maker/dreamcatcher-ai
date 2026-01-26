
import type { Metadata } from "next";
import Link from "next/link";
import BlogBackground from "@/shared/components/blog/BlogBackground";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export const metadata: Metadata = {
  title: "The Architecture of Resonance — Dreamcatcher",
  description: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of being in sync.",
  alternates: {
    canonical: "https://dreamcatcherai.us/blog/architecture-of-resonance",
  },
  openGraph: {
    title: "The Architecture of Resonance — Dreamcatcher",
    description: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of being in sync.",
    url: "https://dreamcatcherai.us/blog/architecture-of-resonance",
    type: "article",
    publishedTime: "2025-01-05",
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
            <span className="text-[10px] tracking-wider text-blue-400/70 px-2 py-0.5 rounded bg-blue-500/5 border border-blue-400/20">
              THEORY
            </span>
            <span className="text-white/30 text-xs ml-3">JAN 05, 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
            The Architecture of Resonance
          </h1>

          <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
            How alignment reduces decision cost and cognitive drag. The hidden mathematics of being in sync.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-blue-400/50 to-transparent mb-12"></div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Cost of Misalignment</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Every decision carries two costs: the visible expenditure of resources, and the invisible tax of cognitive load.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                When action conflicts with environment, cognitive load spikes. The mind processes not just the decision itself, but the friction between intention and context. This drag compounds—each misaligned decision increasing the cost of the next.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Resonance as Efficiency</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Resonance describes the state where internal direction matches external conditions. The signal says "push" and you push. The environment says "pause" and you rest.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                This alignment eliminates cognitive drag. There is no internal negotiation, no second-guessing, no friction between what you want and what the world will support.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                The energy that would be spent overcoming friction becomes available for execution itself.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Field and the Frequency</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Global energy fields operate on cyclical patterns. Some phases favor expansion, others contraction. Neither is inherently better—both are necessary to a complete system.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Personal frequency operates on its own rhythm, shaped by constitution, recent history, and current capacity.
              </p>
              <p className="text-white/60 font-serif leading-relaxed">
                Resonance occurs when these rhythms synchronize. The field welcomes what you have to give. Your frequency is supported by the conditions you encounter.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Reading the Signal</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                The challenge is recognizing alignment in real time. Resistance masquerades as opportunity. Action feels like progress even when it compounds loss.
              </p>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Resonance provides feedback loops:
              </p>
              <ul className="text-white/60 font-serif space-y-2 mb-4">
                <li><strong className="text-white/80">Flow indicates alignment.</strong> When action moves without friction, you are riding the wave.</li>
                <li><strong className="text-white/80">Drag indicates misalignment.</strong> When each step requires force, the signal is against you.</li>
                <li><strong className="text-white/80">Rapid depletion indicates overextension.</strong> When engagement costs more than it returns, you are fighting the current.</li>
              </ul>
              <p className="text-white/60 font-serif leading-relaxed">
                These signals are not emotional. They are system feedback—like engine lights or temperature gauges. Ignoring them doesn't change the physics.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Efficiency Permission</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-4">
                  "Engage intentionally. Not everyone."
                </p>
                <p className="text-white/50 font-serif text-sm">
                  This is not a social directive. It is a statement about allocation. When connection is expansive but not deep, spreading attention dilutes resonance. Selective engagement amplifies impact.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">The Architecture</h2>
              <p className="text-white/60 font-serif leading-relaxed mb-4">
                Resonance is not a feeling. It is an architecture:
              </p>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Inputs match conditions</li>
                <li>Execution flows without friction</li>
                <li>Results exceed proportional investment</li>
                <li>Cognitive load remains minimal</li>
              </ul>
              <p className="text-white/60 font-serif leading-relaxed mt-4">
                When these conditions are met, you are not working harder. You are working with the system rather than against it.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-serif font-medium text-white/90 mb-4">Summary</h2>
              <ul className="text-white/60 font-serif space-y-2">
                <li>Misalignment creates hidden cognitive costs</li>
                <li>Resonance synchronizes internal rhythm with external conditions</li>
                <li>Flow states indicate alignment; drag signals misalignment</li>
                <li>Selective engagement amplifies resonance</li>
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

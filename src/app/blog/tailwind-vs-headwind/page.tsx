
import type { Metadata } from "next";
import Link from "next/link";
import BlogBackground from "@/shared/components/blog/BlogBackground";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export const metadata: Metadata = {
    title: "Why Some Days Multiply Effort — And Others Cancel It — Dreamcatcher",
    description: "Effort is not a vending machine. Learn how to recognize tailwind days where effort multiplies and headwind days where it evaporates.",
    keywords: [
        "effort leverage",
        "tailwind days",
        "headwind days",
        "timing multiplier",
        "productivity cycles",
        "strategic effort",
        "energy management"
    ],
    alternates: {
        canonical: "https://dreamcatcherai.us/blog/tailwind-vs-headwind",
    },
    openGraph: {
        title: "Why Some Days Multiply Effort — And Others Cancel It — Dreamcatcher",
        description: "Effort is not a vending machine. Learn the difference between tailwind and headwind days.",
        url: "https://dreamcatcherai.us/blog/tailwind-vs-headwind",
        type: "article",
        publishedTime: "2025-01-29",
        authors: ["Dreamcatcher"],
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tailwind vs Headwind Days" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tailwind vs Headwind: The Truth About Effort",
        description: "On tailwind days, effort multiplies. On headwind days, it evaporates. Stop fighting the wind.",
        images: ["/og-image.png"],
    }
};

export default function BlogPostPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Why Some Days Multiply Effort — And Others Cancel It",
        "description": "Effort is not a vending machine. Learn how to recognize tailwind days where effort multiplies and headwind days where it evaporates.",
        "datePublished": "2025-01-29",
        "author": { "@type": "Organization", "name": "Dreamcatcher" },
        "publisher": {
            "@type": "Organization",
            "name": "Dreamcatcher",
            "logo": { "@type": "ImageObject", "url": "https://dreamcatcherai.us/favicon.ico" }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://dreamcatcherai.us/blog/tailwind-vs-headwind"
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogBackground />
            <BlogNavigation backLink="/blog" backLabel="BACK" />

            <main className="relative z-10 mx-auto min-h-screen w-full max-w-2xl px-4 py-24">
                <article>
                    <div className="mb-8">
                        <span className="text-[10px] tracking-wider text-blue-400/70 px-2 py-0.5 rounded bg-blue-500/5 border border-blue-400/20">
                            INSIGHT
                        </span>
                        <span className="text-white/30 text-xs ml-3">JAN 29, 2025</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                        Why Some Days Multiply Effort — And Others Cancel It
                    </h1>

                    <p className="text-lg text-white/60 font-serif leading-relaxed mb-12 italic">
                        You’ve felt this before.
                    </p>

                    <div className="w-16 h-px bg-gradient-to-r from-blue-400/50 to-transparent mb-12"></div>

                    <div className="prose prose-invert max-w-none">
                        <section className="mb-12">
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                Some days, one small action moves everything forward. A message gets answered. An idea clicks. Progress feels… lighter.
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                Other days? You try harder. Focus longer. Push more. Nothing lands.
                            </p>
                            <div className="bg-white/5 border-l-4 border-white/20 p-6 mb-8 text-white/80 font-serif">
                                Same you. Same skills. Same effort. Different result. The difference isn’t discipline. <span className="text-white font-bold underline decoration-blue-500/50">It’s timing.</span>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6 uppercase tracking-widest text-blue-400/80">Effort Is Not a Vending Machine</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                We’re taught: <span className="text-white/80 italic">Work hard → Get results.</span>
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                But life works more like weather than math. There are <strong>tailwind days</strong> and <strong>headwind days</strong>.
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-8">
                                On tailwind days, effort multiplies. On headwind days, effort evaporates. Trying twice as hard in the wrong conditions doesn’t double progress — it doubles exhaustion.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6">High-Leverage Days</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                These are days when decisions feel clearer, people are more responsive, and starting feels natural instead of forced. You’re not suddenly more talented; there’s just less friction between you and action.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {['Start', 'Pitch', 'Decide', 'Move forward'].map(item => (
                                    <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-white/70">
                                        <span className="text-blue-400">✔</span> {item}
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/50 font-serif italic text-sm">Small effort. Disproportionate return.</p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6">Low-Leverage Days</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                Then there are days when everything takes more energy, conversations tangle, and decisions feel heavy. This isn’t laziness; it’s poor return on effort.
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-8">
                                Pushing harder here doesn’t create momentum. It creates drag for tomorrow. Smart move?
                            </p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-white/40 font-mono">01</span>
                                    <span><strong>Reduce scope</strong> — Focus on the essential.</span>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-white/40 font-mono">02</span>
                                    <span><strong>Maintain</strong> — Support what’s already working.</span>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-white/40 font-mono">03</span>
                                    <span><strong>Avoid irreversible decisions</strong> — Wait for clarity.</span>
                                </li>
                            </ul>
                            <p className="text-center text-white/30 text-xs tracking-widest uppercase">Still productive. Just quieter.</p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6">The Real Skill No One Taught You</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6 text-lg">
                                Success isn’t just about how hard you work. It’s about <strong>when</strong> hard work actually works.
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-10">
                                Right effort at the wrong time drains you. Right effort at the right time changes your direction. You don’t need to predict the future; you just need to know what kind of day this is: <strong>Push, Maintain, or Pause.</strong>
                            </p>

                            <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-3xl p-8 border border-white/10 text-center">
                                <p className="text-white font-serif italic mb-8">Effort always has a cost. Timing decides the return.</p>
                                <Link
                                    href="/"
                                    className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold tracking-tight hover:bg-blue-400 hover:text-white transition-all"
                                >
                                    CHECK TODAY'S TIMING →
                                </Link>
                            </div>
                        </section>
                    </div>
                </article>

                <div className="mt-16 pt-8 border-t border-white/10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Journal
                    </Link>
                </div>
            </main>
        </div>
    );
}

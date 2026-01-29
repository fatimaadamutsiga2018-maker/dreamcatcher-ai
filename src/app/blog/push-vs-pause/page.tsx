
import type { Metadata } from "next";
import Link from "next/link";
import BlogBackground from "@/shared/components/blog/BlogBackground";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export const metadata: Metadata = {
    title: "When to Push, When to Pause: The Hidden Skill Nobody Taught You — Dreamcatcher",
    description: "High performers aren't just good at action. They're good at timing their action. Learn how to recognize expansion and contraction phases.",
    keywords: [
        "push vs pause",
        "timing skill",
        "strategic action",
        "productivity cycles",
        "decision making",
        "burnout prevention",
        "energy phases"
    ],
    alternates: {
        canonical: "https://dreamcatcherai.us/blog/push-vs-pause",
    },
    openGraph: {
        title: "When to Push, When to Pause: The Hidden Skill Nobody Taught You — Dreamcatcher",
        description: "Success isn't just about how hard you work. It's about when hard work actually works.",
        url: "https://dreamcatcherai.us/blog/push-vs-pause",
        type: "article",
        publishedTime: "2025-01-29",
        authors: ["Dreamcatcher"],
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "When to Push, When to Pause" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Push or Pause? The Hidden Skill of Timing",
        description: "Sometimes pushing works. Sometimes it makes everything worse. Learn the difference.",
        images: ["/og-image.png"],
    }
};

export default function BlogPostPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "When to Push, When to Pause: The Hidden Skill Nobody Taught You",
        "description": "High performers aren't just good at action. They're good at timing their action. Learn how to recognize expansion and contraction phases.",
        "datePublished": "2025-01-29",
        "author": { "@type": "Organization", "name": "Dreamcatcher" },
        "publisher": {
            "@type": "Organization",
            "name": "Dreamcatcher",
            "logo": { "@type": "ImageObject", "url": "https://dreamcatcherai.us/favicon.ico" }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://dreamcatcherai.us/blog/push-vs-pause"
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
                        <span className="text-[10px] tracking-wider text-amber-400/70 px-2 py-0.5 rounded bg-amber-500/5 border border-amber-400/20">
                            STRATEGY
                        </span>
                        <span className="text-white/30 text-xs ml-3">JAN 29, 2025</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                        When to Push, When to Pause: The Hidden Skill Nobody Taught You
                    </h1>

                    <p className="text-lg text-white/60 font-serif leading-relaxed mb-12">
                        Most people think success is about effort. Work harder. Stay consistent. Don’t give up.
                    </p>

                    <div className="w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent mb-12"></div>

                    <div className="prose prose-invert max-w-none">
                        <section className="mb-12">
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                That advice sounds right — until you notice something strange: Sometimes pushing works. Sometimes pushing makes everything worse.
                            </p>
                            <p className="text-white/80 font-serif text-xl border-l-2 border-amber-500/30 pl-6 py-2 mb-8 italic">
                                Same effort. Very different outcomes. What’s missing isn’t motivation. <span className="text-white not-italic font-bold tracking-tight">It’s timing awareness.</span>
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6">The Lie of Constant Forward Motion</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                We’re raised to believe progress should look like a straight line: <strong>More input → More output</strong>.
                            </p>
                            <p className="text-white/60 font-serif leading-relaxed mb-10">
                                But real life moves in cycles, not lines. There are <strong>expansion phases</strong> — when things open easily — and <strong>contraction phases</strong> — when systems recalibrate. If you treat both phases the same, you burn energy at the wrong moments.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> When It’s Time to Push
                            </h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                Pushing works best when decisions feel unusually clear, you have a quiet sense of readiness, and conversations flow instead of stall. This is a <strong>low-resistance window.</strong>
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 mb-8">
                                {['Launch the idea', 'Send the message', 'Make the decision', 'Take the visible step'].map(action => (
                                    <li key={action} className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl text-sm text-emerald-100/80">
                                        <span className="mr-2 opacity-50">→</span> {action}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-white/60 font-serif italic">Effort compounds here. Momentum builds faster than expected.</p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span> When It’s Time to Pause
                            </h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-6">
                                Pausing isn’t quitting; it’s protecting your return on energy. You’re in a pause phase when small tasks feel heavy, every option feels slightly wrong, or you want clarity but only get noise.
                            </p>
                            <div className="bg-rose-500/5 border border-rose-500/10 p-6 rounded-2xl mb-8">
                                <p className="text-rose-200/80 text-sm font-bold mb-4 uppercase tracking-[0.2em]">Smarter moves:</p>
                                <div className="space-y-4 text-white/70 font-serif">
                                    <p>• <strong>Maintain</strong> instead of expand</p>
                                    <p>• <strong>Organize</strong> instead of initiate</p>
                                    <p>• <strong>Rest</strong> instead of force</p>
                                </div>
                            </div>
                            <p className="text-white/60 font-serif leading-relaxed">
                                Big pushes here often create regret decisions or unnecessary conflict. You’re not falling behind; you’re waiting for leverage to return.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif font-medium text-white/90 mb-6">The Real Upgrade</h2>
                            <p className="text-white/60 font-serif leading-relaxed mb-8">
                                High performers aren’t just good at action; they’re good at <strong>timing</strong> their action. You don’t need superhuman willpower. You need to ask a better question each day:
                            </p>
                            <div className="text-center py-12 px-6 rounded-3xl bg-white/5 border border-white/10 mb-10">
                                <h3 className="text-2xl font-serif text-white mb-6">Is today a day to push — or a day to pause?</h3>
                                <Link
                                    href="/"
                                    className="inline-block px-10 py-5 rounded-full bg-violet-600 text-white font-bold tracking-tight hover:bg-violet-500 transition-all shadow-2xl shadow-violet-500/20"
                                >
                                    DETERMINE TODAY'S SIGNAL
                                </Link>
                            </div>
                            <p className="text-white/60 font-serif leading-relaxed">
                                Because effort is powerful. But effort applied at the wrong time quietly drains your future. Learning the difference? <strong>That’s the hidden skill nobody taught you.</strong>
                            </p>
                        </section>
                    </div>
                </article>

                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <Link href="/blog" className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-widest uppercase">
                        Browse All Decision Briefs
                    </Link>
                </div>
            </main>
        </div>
    );
}

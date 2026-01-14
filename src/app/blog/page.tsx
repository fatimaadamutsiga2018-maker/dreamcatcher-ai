"use client";

import Link from "next/link";
import NebulaBackground from "@/shared/components/dreamcatcher/NebulaBackground";
import { useState, useEffect } from "react";

// Wisdom Quotes Library
interface Quote {
  text: string;
  category: 'philosophy' | 'timing' | 'rest' | 'action' | 'wealth';
}

const WISDOM_QUOTES: Quote[] = [
  { text: "Align with the field. Flow with the day.", category: 'philosophy' },
  { text: "Don't just act. Respond to the rhythm.", category: 'philosophy' },
  { text: "Effort has a cost. Timing decides whether that cost pays back.", category: 'timing' },
  { text: "You don't need confidence. You need the right moment.", category: 'timing' },
  { text: "Wealth follows alignment, not just effort.", category: 'wealth' },
  { text: "Opportunities don't disappear; they just move to those who are ready.", category: 'wealth' },
  { text: "Rest isn't weakness. It's waiting for the slope to change.", category: 'rest' },
  { text: "Sometimes the smartest move isn't doing more—it's choosing a better moment to act.", category: 'timing' },
  { text: "Not every day is designed for action. Some days are designed for recovery.", category: 'rest' },
  { text: "Momentum comes before confidence, not after.", category: 'action' },
];

function getRandomQuotes(count: number = 2): Quote[] {
  const shuffled = [...WISDOM_QUOTES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function BlogPage() {
  const [currentDate] = useState(new Date());

  // Random wisdom quotes (client-side only to avoid hydration mismatch)
  const [dailyQuotes, setDailyQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    setDailyQuotes(getRandomQuotes(2));
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "It's Not That You're Not Working Hard — You're Just Pushing at the Wrong Time",
      excerpt: "Effort has a cost. Timing decides whether that cost pays back. The case for strategic action over constant effort.",
      date: "JAN 12, 2025",
      category: "CONCEPT",
      readTime: "4 MIN READ",
      href: "/blog/timing-matters-more-than-effort",
    },
    {
      id: 2,
      title: "Why Resting at the Right Time Is Not Quitting",
      excerpt: "There are days when pushing costs you more than it gives back. Rest is waiting for the slope to change.",
      date: "JAN 12, 2025",
      category: "INSIGHT",
      readTime: "4 MIN READ",
      href: "/blog/rest-is-not-quitting",
    },
    {
      id: 3,
      title: "You Don't Need Confidence — You Need the Right Moment to Start",
      excerpt: "Confidence doesn't come first. Momentum does. You might just be waiting for the right green light.",
      date: "JAN 12, 2025",
      category: "INSIGHT",
      readTime: "3 MIN READ",
      href: "/blog/momentum-not-confidence",
    },
    {
      id: 4,
      title: "Why Timing Changes Everything (Even When Nothing Else Does)",
      excerpt: "Two people can do the same thing. Same skills. Same effort. The difference is rarely talent. It's timing.",
      date: "JAN 12, 2025",
      category: "INSIGHT",
      readTime: "3 MIN READ",
      href: "/blog/why-timing-changes-everything",
    },
    {
      id: 5,
      title: "Why Doing Nothing Can Be Rational",
      excerpt: "In low-leverage environments, restraint preserves optionality. The case for strategic pause.",
      date: "JAN 08, 2025",
      category: "SYSTEM",
      readTime: "5 MIN READ",
      href: "/blog/why-doing-nothing-is-rational",
    },
    {
      id: 6,
      title: "The Architecture of Resonance",
      excerpt: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of sync.",
      date: "JAN 05, 2025",
      category: "THEORY",
      readTime: "7 MIN READ",
      href: "/blog/architecture-of-resonance",
    },
    {
      id: 7,
      title: "The Speed of Clarity",
      excerpt: "Insight erodes when action is delayed. The case for rapid deployment during density windows.",
      date: "DEC 28, 2024",
      category: "INSIGHT",
      readTime: "4 MIN READ",
      href: "/blog/the-speed-of-clarity",
    },
  ];

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

      <main className="relative z-10 mx-auto min-h-screen w-full max-w-4xl px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-violet-400/80 mb-4">JOURNAL</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-[0.15em] text-white mb-4" style={{ textShadow: '0 0 30px rgba(139,92,246,0.6)' }}>
            BLOG
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Exploring the intersection of energy fields, decision architecture, and strategic timing.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 hover:scale-[1.01] hover:border-white/20 hover:bg-white/10 cursor-pointer block"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/5 to-blue-500/5 blur-xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-wider text-violet-400/80 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-400/20">
                      {post.category}
                    </span>
                    <span className="text-white/40 text-xs">{post.date}</span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="text-white/40 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <svg className="w-6 h-6 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer + Wisdom Quotes */}
        <div className="mt-16 space-y-8">
          {/* Random Wisdom Quotes */}
          <div className="max-w-xl mx-auto text-center">
            {dailyQuotes.length > 0 ? (
              dailyQuotes.map((quote, index) => (
                <p key={index} className="text-xs text-white/20 italic leading-relaxed mb-2">
                  "{quote.text}"
                </p>
              ))
            ) : (
              <>
                <p className="text-xs text-white/20 italic leading-relaxed mb-2">"</p>
                <p className="text-xs text-white/20 italic leading-relaxed mb-2">"</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-white/15 text-xs tracking-widest">
            DREAMCATCHER AI · BLOG
          </div>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You Don't Need Confidence — You Need the Right Moment to Start",
  description: "Confidence doesn't come first. Momentum does. You might just be waiting for the right green light. Learn how to recognize momentum-generating moments and start without needing confidence.",
  keywords: [
    "confidence vs momentum",
    "how to start",
    "overcoming fear",
    "action beats confidence",
    "momentum building",
    "starting before ready",
    "taking action"
  ],
  openGraph: {
    title: "You Don't Need Confidence — You Need the Right Moment to Start",
    description: "Confidence doesn't come first. Momentum does. You might just be waiting for the right green light.",
    type: "article",
    publishedTime: "2025-01-12",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcher-ai-nine.vercel.app/blog/momentum-not-confidence",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Don't Need Confidence — You Need the Right Moment to Start",
    description: "Confidence doesn't come first. Momentum does. You might just be waiting for the right green light.",
  },
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app/blog/momentum-not-confidence"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

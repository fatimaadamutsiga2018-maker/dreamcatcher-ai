import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Resting at the Right Time Is Not Quitting",
  description: "There are days when pushing costs you more than it gives back. Rest is waiting for the slope to change. Learn how to recognize when strategic rest is the most productive action you can take.",
  keywords: [
    "strategic rest",
    "when to rest",
    "recovery days",
    "energy conservation",
    "productivity and rest",
    "not quitting",
    "strategic pause",
    "energy management"
  ],
  openGraph: {
    title: "Why Resting at the Right Time Is Not Quitting",
    description: "There are days when pushing costs you more than it gives back. Rest is waiting for the slope to change.",
    type: "article",
    publishedTime: "2025-01-12",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcher-ai-nine.vercel.app/blog/rest-is-not-quitting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Resting at the Right Time Is Not Quitting",
    description: "There are days when pushing costs you more than it gives back. Rest is waiting for the slope to change.",
  },
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app/blog/rest-is-not-quitting"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

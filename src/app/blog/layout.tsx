import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Dreamcatcher AI Journal",
  description: "Exploring the intersection of energy fields, decision architecture, and strategic timing. Read insights on when to act, when to rest, and how to align your efforts with natural rhythms.",
  keywords: [
    "decision making blog",
    "energy field articles",
    "strategic timing insights",
    "productivity journal",
    "action vs rest",
    "momentum building",
    "energy management"
  ],
  openGraph: {
    title: "Blog — Dreamcatcher AI Journal",
    description: "Exploring the intersection of energy fields, decision architecture, and strategic timing.",
    type: "website",
    url: "https://dreamcatcherai.us/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Dreamcatcher AI Journal",
    description: "Exploring the intersection of energy fields, decision architecture, and strategic timing.",
  },
  alternates: {
    canonical: "https://dreamcatcherai.us/blog"
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

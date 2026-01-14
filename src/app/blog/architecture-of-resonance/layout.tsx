import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Architecture of Resonance — How Alignment Reduces Decision Cost",
  description: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of sync. Discover the architecture behind resonance and why aligned action is more efficient than forced effort.",
  keywords: [
    "resonance architecture",
    "alignment and decisions",
    "cognitive drag",
    "decision cost reduction",
    "flow state",
    "energy alignment",
    "synchronization",
    "systems thinking"
  ],
  openGraph: {
    title: "The Architecture of Resonance — How Alignment Reduces Decision Cost",
    description: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of sync.",
    type: "article",
    publishedTime: "2025-01-05",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcher-ai-nine.vercel.app/blog/architecture-of-resonance",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Architecture of Resonance — How Alignment Reduces Decision Cost",
    description: "How alignment reduces decision cost and cognitive drag. The hidden mathematics of sync.",
  },
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app/blog/architecture-of-resonance"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

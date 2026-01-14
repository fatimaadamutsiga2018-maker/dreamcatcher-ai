import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Speed of Clarity — Why Action Delight Erodes Insight",
  description: "Insight erodes when action is delayed. The case for rapid deployment during density windows. Learn why capturing clarity in the moment is more powerful than planning for later.",
  keywords: [
    "clarity and action",
    "insight decay",
    "rapid deployment",
    "density windows",
    "decision timing",
    "acting on clarity",
    "momentum",
    "speed of implementation"
  ],
  openGraph: {
    title: "The Speed of Clarity — Why Action Delay Erodes Insight",
    description: "Insight erodes when action is delayed. The case for rapid deployment during density windows.",
    type: "article",
    publishedTime: "2024-12-28",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcher-ai-nine.vercel.app/blog/the-speed-of-clarity",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Speed of Clarity — Why Action Delay Erodes Insight",
    description: "Insight erodes when action is delayed. The case for rapid deployment during density windows.",
  },
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app/blog/the-speed-of-clarity"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

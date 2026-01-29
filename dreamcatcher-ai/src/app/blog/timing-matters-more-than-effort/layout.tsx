import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "It's Not That You're Not Working Hard — You're Just Pushing at the Wrong Time",
  description: "Most people believe success comes from effort. But here's a quieter truth: Effort has a cost. Timing decides whether that cost pays back. Learn how to identify when your effort will actually pay off.",
  keywords: [
    "effort vs timing",
    "strategic timing",
    "when to work hard",
    "decision making",
    "energy management",
    "productivity timing",
    "work life balance",
    "strategic action"
  ],
  openGraph: {
    title: "It's Not That You're Not Working Hard — You're Just Pushing at the Wrong Time",
    description: "Most people believe success comes from effort. But here's a quieter truth: Effort has a cost. Timing decides whether that cost pays back.",
    type: "article",
    publishedTime: "2025-01-12",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcherai.us/blog/timing-matters-more-than-effort",
    images: [
      {
        url: "/blog/timing-matters-more-than-effort/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timing Matters More Than Effort"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Not That You're Not Working Hard — You're Just Pushing at the Wrong Time",
    description: "Most people believe success comes from effort. But here's a quieter truth: Effort has a cost. Timing decides whether that cost pays back.",
  },
  alternates: {
    canonical: "https://dreamcatcherai.us/blog/timing-matters-more-than-effort"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

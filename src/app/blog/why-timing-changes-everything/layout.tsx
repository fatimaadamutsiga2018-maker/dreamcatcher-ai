import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Timing Changes Everything (Even When Nothing Else Does)",
  description: "Two people can do the same thing. Same skills. Same effort. The difference is rarely talent. It's timing. Discover why timing is the hidden variable that determines outcomes.",
  keywords: [
    "timing is everything",
    "hidden variables in success",
    "why timing matters",
    "success factors",
    "strategic timing",
    "effort vs results",
    "decision timing"
  ],
  openGraph: {
    title: "Why Timing Changes Everything (Even When Nothing Else Does)",
    description: "Two people can do the same thing. Same skills. Same effort. The difference is rarely talent. It's timing.",
    type: "article",
    publishedTime: "2025-01-12",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcher-ai-nine.vercel.app/blog/why-timing-changes-everything",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Timing Changes Everything (Even When Nothing Else Does)",
    description: "Two people can do the same thing. Same skills. Same effort. The difference is rarely talent. It's timing.",
  },
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app/blog/why-timing-changes-everything"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

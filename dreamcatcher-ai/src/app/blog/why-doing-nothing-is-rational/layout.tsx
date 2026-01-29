import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Doing Nothing Can Be Rational — Strategic Rest",
  description: "In low-leverage environments, restraint preserves optionality. Learn when inaction is actually the most strategic choice, and why doing nothing can be more powerful than taking action.",
  keywords: [
    "strategic inaction",
    "doing nothing",
    "optionality preservation",
    "strategic pause",
    "when to wait",
    "low leverage environments",
    "decision paralysis vs strategic waiting",
    "rational inaction"
  ],
  openGraph: {
    title: "Why Doing Nothing Can Be Rational — Strategic Rest",
    description: "In low-leverage environments, restraint preserves optionality. The case for strategic pause.",
    type: "article",
    publishedTime: "2025-01-08",
    authors: ["Dreamcatcher AI"],
    url: "https://dreamcatcherai.us/blog/why-doing-nothing-is-rational",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Doing Nothing Can Be Rational — Strategic Rest",
    description: "In low-leverage environments, restraint preserves optionality. The case for strategic pause.",
  },
  alternates: {
    canonical: "https://dreamcatcherai.us/blog/why-doing-nothing-is-rational"
  }
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

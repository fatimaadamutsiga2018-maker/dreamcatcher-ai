import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/shared/components/dreamcatcher/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata (AEO Optimized for 2026)
export const metadata: Metadata = {
  // Basic
  title: {
    default: "Dreamcatcher — Know When to Act, Pause, or Wait Each Day",
    template: "%s | Dreamcatcher"
  },
  description: "Dreamcatcher helps you understand today's energy and choose the right timing for action, rest, or consolidation.",
  keywords: [
    "daily energy guide",
    "timing decision support",
    "when to act or pause",
    "personal rhythm",
    "strategic timing",
    "energy cycles",
    "action timing",
    "momentum tracking",
    "decision dashboard",
    "daily energy forecast"
  ],
  authors: [{ name: "Dreamcatcher" }],
  creator: "Dreamcatcher",
  publisher: "Dreamcatcher",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamcatcherai.us",
    title: "Dreamcatcher — Know When to Act, Pause, or Wait Each Day",
    description: "Dreamcatcher helps you understand today's energy and choose the right timing for action, rest, or consolidation.",
    siteName: "Dreamcatcher",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dreamcatcher - Daily Energy & Timing Guide"
      }
    ]
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Dreamcatcher — Know When to Act, Pause, or Wait Each Day",
    description: "Dreamcatcher helps you understand today's energy and choose the right timing for action, rest, or consolidation.",
    images: ["/og-image.png"],
    creator: "@dreamcatcherai"
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    // google: "your-google-verification-code",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // App
  appleWebApp: {
    capable: true,
    title: "Dreamcatcher",
    statusBarStyle: "default",
  },

  // Alternate
  alternates: {
    canonical: "https://dreamcatcherai.us",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // FAQ Schema Markup for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Dreamcatcher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dreamcatcher is a daily energy & timing decision guide that helps you understand when to act, pause, or adjust based on natural energy cycles."
        }
      },
      {
        "@type": "Question",
        "name": "How does Dreamcatcher work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We analyze daily energy patterns using ancient timing wisdom combined with modern decision science. Each day gets a unique energy profile for business, social, strategy, and action domains."
        }
      },
      {
        "@type": "Question",
        "name": "Is this astrology or fortune telling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Dreamcatcher is based on timing principles and energy patterns. It's a decision support tool, not a prediction system. You're always the final decision-maker."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I check Dreamcatcher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Energy changes daily. Check each morning to align your schedule with the day's natural rhythm. Many users find it helpful before planning their day."
        }
      }
    ]
  };

  // WebSite Schema Markup
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dreamcatcher",
    "url": "https://dreamcatcherai.us",
    "description": "Dreamcatcher helps you understand today's energy and choose the right timing for action, rest, or consolidation.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dreamcatcherai.us/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

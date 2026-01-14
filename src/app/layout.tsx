import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata: Metadata = {
  // Basic
  title: {
    default: "Dreamcatcher AI — Daily Energy & Decision Guidance",
    template: "%s | Dreamcatcher AI"
  },
  description: "Discover your daily energy rhythm. Get personalized timing guidance for business, relationships, and strategic decisions. Align your actions with the field, not against it.",
  keywords: [
    "daily energy guidance",
    "timing astrology",
    "decision making tool",
    "energy field analysis",
    "strategic timing",
    "personal rhythm",
    "daily oracle",
    "action timing",
    "rest vs action",
    "momentum tracking",
    "chinese energy cycles",
    "decision dashboard"
  ],
  authors: [{ name: "Dreamcatcher AI" }],
  creator: "Dreamcatcher AI",
  publisher: "Dreamcatcher AI",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamcatcher-ai-nine.vercel.app",
    title: "Dreamcatcher AI — Daily Energy & Decision Guidance",
    description: "Discover your daily energy rhythm. Get personalized timing guidance for business, relationships, and strategic decisions.",
    siteName: "Dreamcatcher AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dreamcatcher AI"
      }
    ]
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Dreamcatcher AI — Daily Energy & Decision Guidance",
    description: "Discover your daily energy rhythm. Get personalized timing guidance for business, relationships, and strategic decisions.",
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
    // yandex: "your-yandex-verification-code",
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
    title: "Dreamcatcher AI",
    statusBarStyle: "default",
  },

  // Alternate
  alternates: {
    canonical: "https://dreamcatcher-ai-nine.vercel.app",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

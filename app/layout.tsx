import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ClarityPath — Better Choices, Elevated Energy, Easier Life",
    template: "%s | ClarityPath",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "DreamCatcher AI" }],
  creator: "DreamCatcher AI",
  publisher: "DreamCatcher AI",
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "ClarityPath — Better Choices, Elevated Energy, Easier Life",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "ClarityPath — Better Choices, Elevated Energy, Easier Life",
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DreamCatcher AI",
  url: SITE_URL,
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@dreamcatcherai.us",
    contactType: "customer service",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Rest — The World's First On-demand NSDR Recovery Engine",
  description: "For the mentally exhausted who can't stop thinking, AI-guided NSDR sessions deliver a proven reset in under 12 minutes — no skill, no practice, just rest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}


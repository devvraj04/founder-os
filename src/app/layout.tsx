import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FounderOS — Your Cognitive Operating System",
  description:
    "FounderOS combats entrepreneurial burnout and decision fatigue through three human-centered tools: Cognitive Shield, Founder Disconnect Mode, and FounderWalk. Built on Design Thinking research.",
  keywords: "founder burnout, decision fatigue, startup mental health, cognitive shield, founder disconnect mode, founderwalk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

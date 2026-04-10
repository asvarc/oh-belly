import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Display font — Space Grotesk fallback until Frama .woff2 files are added
// See /public/fonts/README.md for Frama setup instructions
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Oh Belly — Prebiotická limonáda pro šťastná střeva",
  description:
    "Prebiotická limonáda bez cukru. Perlivá, osvěžující a šetrná ke střevům.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

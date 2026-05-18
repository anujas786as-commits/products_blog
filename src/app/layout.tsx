import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "BestPicks | Top Marketplace Product Reviews",
    template: "%s | BestPicks"
  },
  description: "Expert reviews and curated lists of top products from Amazon, Flipkart, and Meesho. Save time and shop smarter with BestPicks.",
  keywords: ["affiliate products", "product reviews", "top picks", "buying guides", "Amazon deals", "Flipkart offers"],
  authors: [{ name: "BestPicks Team" }],
  openGraph: {
    title: "BestPicks | Affiliate Product Showcase",
    description: "Expert reviews and curated lists of top products from Amazon, Flipkart, and Meesho.",
    url: "https://bestpicks.com",
    siteName: "BestPicks",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BestPicks | Top Marketplace Product Reviews",
    description: "Expert reviews and curated lists of top products from Amazon, Flipkart, and Meesho.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

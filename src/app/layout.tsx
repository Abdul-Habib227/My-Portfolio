import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { theme } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-eoc1.vercel.app"),
  title: {
    default: "Abdul Habib | Graphic Designer & Video Editor",
    template: "%s | Abdul Habib"
  },
  description: "Professional portfolio of Abdul Habib - Specialized in high-end Graphic Design and Video Editing. Creative solutions for brands and individuals.",
  keywords: ["Graphic Design", "Video Editing", "Abdul Habib", "Visual Content Creator", "Portfolio"],
  authors: [{ name: "Abdul Habib" }],
  creator: "Abdul Habib",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-portfolio-eoc1.vercel.app",
    siteName: "Abdul Habib Portfolio",
    title: "Abdul Habib | Graphic Designer & Video Editor",
    description: "Specialized in high-end Graphic Design and Video Editing.",
    images: [
      {
        url: "/og-image.png", // Assume there's an OG image or placeholder
        width: 1200,
        height: 630,
        alt: "Abdul Habib Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Habib | Graphic Designer & Video Editor",
    description: "Specialized in high-end Graphic Design and Video Editing.",
    images: ["/og-image.png"],
    creator: "@abdulhabib", // Placeholder or actual handle if known
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "bwLR0NQcbkGbzxZhundMloTFEBtJ9NQ08IaHXJcmy9A",
  },
};

import JsonLd from "@/components/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased selection:bg-primary/30`}>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

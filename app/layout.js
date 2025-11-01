import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bassa Naga Jala Suryanarayana - Portfolio",
  description: "Software developer and tech enthusiast building high-performance, scalable web applications",
  keywords: "developer, portfolio, web development, React, Next.js",
  authors: [{ name: "Bassa Naga Jala Suryanarayana" }],
  openGraph: {
    title: "Bassa Naga Jala Suryanarayana - Portfolio",
    description: "Software developer and tech enthusiast",
    type: "website",
  },
};

// Enhanced viewport configuration for all device types
export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
};

import ClientHydrationFix from "../components/ClientHydrationFix";

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning prevents a hard hydration error from being thrown
    // if a browser extension or other runtime mutates the <html> attributes
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional mobile meta tags for better responsiveness */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Improve font rendering on mobile */}
        <meta name="format-detection" content="telephone=no, email=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-white text-gray-900`}
      >
        <Navbar />
        <ClientHydrationFix />
        {children}
      </body>
    </html>
  );
}

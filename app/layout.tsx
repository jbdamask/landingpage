import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Cursor Journal",
  description: "Transform AI Conversations Into Shareable Content. Automatically summarize your Cursor AI interactions into polished blog posts and tweets, saving you hours of documentation time.",
  icons: {
    icon: [
      {
        url: "/images/cursor-journal-logo_thumbnail.jpg",
        type: "image/svg+xml",
        sizes: "32x32"
      },
      {
        url: "/images/cursor-journal-logo_thumbnail.jpg",
        type: "image/svg+xml",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/images/cursor-journal-logo_thumbnail.jpg",
        type: "image/svg+xml",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/images/cursor-journal-logo_thumbnail.jpg" }],
    other: [
      {
        rel: "icon",
        url: "/images/cursor-journal-logo_thumbnail.jpg",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/images/cursor-journal-logo_thumbnail.jpg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/images/cursor-journal-logo_thumbnail.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/cursor-journal-logo_thumbnail.jpg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-black bg-dotted-grid`}>{children}</body>
    </html>
  );
}

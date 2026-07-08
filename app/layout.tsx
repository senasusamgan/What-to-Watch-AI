import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "What to Watch AI",
    template: "%s | What to Watch AI",
  },
  description:
    "AI-powered movie and TV recommendations with trailers, cast information and personalized suggestions.",
  keywords: [
    "movie recommendations",
    "TV recommendations",
    "AI movie recommendations",
    "films",
    "TV shows",
    "TMDB",
  ],
  authors: [{ name: "Ege Özgür" }],
  creator: "Ege Özgür",
  applicationName: "What to Watch AI",
  openGraph: {
    title: "What to Watch AI",
    description:
      "Discover movies and TV shows with personalized AI recommendations.",
    type: "website",
    locale: "en_US",
    siteName: "What to Watch AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Watch AI",
    description:
      "Discover movies and TV shows with personalized AI recommendations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
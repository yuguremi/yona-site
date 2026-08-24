import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/common/NoiseOverlay";
import { PageTransition } from "@/components/common/PageTransition";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { socialLinks } from "@/data/socialLinks";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  // The Japanese glyph set is large; skip preloading to keep LCP fast.
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createMetadata({ image: null }),
  applicationName: siteConfig.name,
  authors: [{ name: "yona" }],
  creator: "yona",
  keywords: [
    "yona",
    "音楽プロデューサー",
    "クリエイティブディレクター",
    "アーティストプロデュース",
    "作曲",
    "作詞",
    "TRACE SILVER",
  ],
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JSON-LD structured data (SPEC §8.3)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "yona",
      jobTitle: "Music Producer / Creative Director",
      description: siteConfig.description,
      url: siteConfig.url,
      sameAs: socialLinks
        .filter((link) => /^https?:\/\//.test(link.href))
        .map((link) => link.href),
      worksFor: {
        "@type": "Organization",
        name: "TRACE SILVER",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "ja",
    },
  ];

  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${notoSansJP.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-background"
        >
          本文へスキップ
        </a>
        <NoiseOverlay />
        <Header />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

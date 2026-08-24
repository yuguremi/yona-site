import type { Metadata } from "next";

/**
 * Single source of truth for site-wide identity & SEO defaults.
 * Set NEXT_PUBLIC_SITE_URL in the environment for correct canonical / OG URLs.
 */
export const siteConfig = {
  name: "yona",
  title: "yona — Music Producer / Creative Director",
  description:
    "音楽プロデューサー／クリエイティブディレクター yona。作詞作曲、アーティストプロデュース、ライブ設計、ビジュアル、プロモーションまで横断して設計。",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://yona.example.com").replace(/\/$/, ""),
  locale: "ja_JP",
  role: "MUSIC PRODUCER / CREATIVE DIRECTOR",
  tagline: "感情を、音楽と物語に変える。",
  taglineEn: "Turning emotions into music and stories.",
  founderOf: "TRACE SILVER",
} as const;

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  /**
   * Social share image. Defaults to the site-wide generated OG image.
   * Pass `null` on routes that provide their own `opengraph-image` file,
   * so the tag is not duplicated.
   */
  image?: string | null;
};

/**
 * Builds per-page metadata with consistent canonical URLs, Open Graph and
 * Twitter cards. OG/Twitter images are injected automatically by the
 * `opengraph-image.tsx` file convention, so they are not set here.
 */
export function createMetadata({
  title,
  description,
  path = "/",
  noIndex,
  image,
}: CreateMetadataInput = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedImage = image === null ? undefined : (image ?? `${siteConfig.url}/opengraph-image`);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: siteConfig.locale,
      ...(resolvedImage ? { images: [{ url: resolvedImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(resolvedImage ? { images: [resolvedImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

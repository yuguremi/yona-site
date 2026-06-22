import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when source images are supplied (SPEC §6.5).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Discography was merged into the WORKS page.
      { source: "/discography", destination: "/works", permanent: true },
      // ABOUT page was removed.
      { source: "/about", destination: "/", permanent: true },
      // にしの愛望 moved from a WORKS project to the 楽曲提供 list.
      { source: "/works/nishino-aimi", destination: "/works", permanent: true },
    ];
  },
};

export default nextConfig;

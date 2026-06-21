import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when source images are supplied (SPEC §6.5).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Discography was merged into the WORKS page.
    return [{ source: "/discography", destination: "/works", permanent: true }];
  },
};

export default nextConfig;

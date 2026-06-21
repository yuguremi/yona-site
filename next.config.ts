import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when source images are supplied (SPEC §6.5).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

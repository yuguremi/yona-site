import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const alt = "yona — Music Producer / Creative Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph image, generated at build time (SPEC §8.4).
 * Uses Latin-only text so it renders correctly with the default OG font;
 * replace by adding `public/...` image files or a custom font if needed.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090909",
          color: "#f1eee8",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#2bb6a4" }}>
          DIGITAL ARCHIVE OF EMOTIONS
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 220, fontWeight: 700, lineHeight: 1 }}>
            yona
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              letterSpacing: 6,
              color: "#f1eee8",
            }}
          >
            MUSIC PRODUCER / CREATIVE DIRECTOR
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#8a8a8a" }}>
          {siteConfig.taglineEn}
        </div>
      </div>
    ),
    { ...size },
  );
}

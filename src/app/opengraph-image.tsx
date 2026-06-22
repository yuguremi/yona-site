import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/metadata";

export const alt = "yona — Music Producer / Creative Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph image (SPEC §8.4): generated atmospheric background
 * with the brand text composited on top. Latin-only text renders correctly
 * with the default OG font.
 */
export default async function OpengraphImage() {
  const bg = await readFile(join(process.cwd(), "public/images/og/og-bg.jpg"));
  const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#090909" }}>
        <img
          src={bgSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "rgba(9,9,9,0.55)" }} />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "80px",
            color: "#f1eee8",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#2bb6a4" }}>
            DIGITAL ARCHIVE OF EMOTIONS
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 220, fontWeight: 700, lineHeight: 1 }}>yona</div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 34, letterSpacing: 6 }}>
              MUSIC PRODUCER / CREATIVE DIRECTOR
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 28, color: "#c9c6c0" }}>{siteConfig.taglineEn}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

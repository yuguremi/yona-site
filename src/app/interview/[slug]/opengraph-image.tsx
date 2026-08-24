import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getInterviewBySlug, visibleInterviews } from "@/data/interviews";
import { siteConfig } from "@/lib/metadata";

export const alt = "yona interview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return visibleInterviews.map((item) => ({ slug: item.slug }));
}

/**
 * Loads a Japanese font subset containing only the characters we render.
 * Returns null when offline so the build never fails because of it.
 */
async function loadJapaneseFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css?family=Noto+Sans+JP:700&text=${encodeURIComponent(text)}`;
    // No User-Agent header: Google Fonts then serves plain TrueType,
    // which is what satori (next/og) can parse.
    const css = await fetch(cssUrl).then((res) => res.text());
    const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
    if (!fontUrl) return null;
    const res = await fetch(fontUrl);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function loadCover(path: string): Promise<string | null> {
  if (!path || !path.startsWith("/")) return null;
  try {
    const file = await readFile(join(process.cwd(), "public", path.slice(1)));
    const ext = path.split(".").pop()?.toLowerCase();
    const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    return `data:${mime};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function InterviewOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getInterviewBySlug(slug);

  const title = item?.title ?? "Interview";
  const subtitle = item?.subtitle ?? "";
  const artist = item?.artist ?? siteConfig.name;

  const [font, cover] = await Promise.all([
    loadJapaneseFont(`${title}${subtitle}インタビュー`),
    loadCover(item?.image ?? ""),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#090909",
        }}
      >
        {cover ? (
          <img
            src={cover}
            alt=""
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size.width,
              height: size.height,
              objectFit: "cover",
            }}
          />
        ) : null}
        {/* Flat scrim + gradient (satori needs backgroundImage for gradients) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundColor: "rgba(9,9,9,0.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.72) 50%, rgba(9,9,9,0.30) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage:
              "linear-gradient(0deg, rgba(9,9,9,0.85) 0%, rgba(9,9,9,0.10) 45%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: size.width,
            height: size.height,
            padding: "72px",
            color: "#f1eee8",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#2bb6a4" }}>
            {artist.toUpperCase()} / INTERVIEW
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.2 }}>
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  fontSize: 34,
                  lineHeight: 1.4,
                  color: "#d9d6d0",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26 }}>
            <span style={{ fontWeight: 700 }}>yona</span>
            <span style={{ color: "#8a8a8a", letterSpacing: 4, fontSize: 20 }}>
              MUSIC PRODUCER / CREATIVE DIRECTOR
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(font
        ? {
            fonts: [
              { name: "Noto Sans JP", data: font, style: "normal" as const, weight: 700 as const },
            ],
          }
        : {}),
    },
  );
}

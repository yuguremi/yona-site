import { ImageResponse } from "next/og";
import { discography, totalSongCount } from "@/data/discography";

export const alt = "yona — Music Producer / Composer / Creative Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 80, background: "#0B0B0C", color: "#ECE9E4" }}>
    <div style={{ display: "flex", fontSize: 20, letterSpacing: 5, color: "#8F8B85" }}>MUSIC PRODUCER / COMPOSER / CREATIVE DIRECTOR</div>
    <div style={{ display: "flex", fontSize: 260, fontWeight: 300, lineHeight: 0.8, letterSpacing: -10 }}>yona</div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 25, letterSpacing: 3 }}><span style={{ color: "#E2344F" }}>{totalSongCount()} SONGS · {discography.length} ARTISTS</span><span style={{ color: "#8F8B85" }}>TRACE SILVER</span></div>
  </div>, { ...size });
}

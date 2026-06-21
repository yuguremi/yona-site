/**
 * Tiny class-name joiner (avoids pulling in an extra dependency).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Returns true when a media path is actually provided.
 * Used to switch between <next/image> and the typographic placeholder.
 * (SPEC §11 / §12 — graceful handling of un-supplied images.)
 */
export function hasMedia(src?: string | null): src is string {
  return typeof src === "string" && src.trim().length > 0;
}

/**
 * Extracts a comparable year number from a free-form year string
 * such as "2025", "2025–" or "2024.10". Used for sorting works.
 */
export function yearValue(year: string): number {
  const match = year.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

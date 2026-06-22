import { yearValue } from "@/lib/utils";

/**
 * Works data store (SPEC §4.2 / §11).
 *
 * To add a new work: append an object to the `works` array below.
 * To attach images: drop files under `public/images/works/<slug>/` and set
 * `thumbnail` / `images` to their paths. While a path is empty (""), a
 * black typographic placeholder is rendered automatically — the layout
 * never breaks, so images can be supplied later without code changes.
 */

export type WorkCategory =
  | "artist-produce"
  | "music"
  | "live-event"
  | "creative-direction";

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  category: WorkCategory[];
  role: string[];
  client?: string;
  description: string;
  concept?: string;
  challenge?: string;
  approach?: string;
  result?: string;
  credits?: {
    label: string;
    value: string;
  }[];
  /** Cover image path, or "" to render the typographic placeholder */
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
  musicUrl?: string;
  externalUrl?: string;
  featured?: boolean;
};

/** Human-readable labels for each category. */
export const categoryLabels: Record<WorkCategory, string> = {
  "artist-produce": "Artist Produce",
  music: "Music",
  "live-event": "Live / Event",
  "creative-direction": "Creative Direction",
};

/** Filter options for the WORKS index (SPEC §4.2). */
export const categoryFilters: { value: WorkCategory | "all"; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "artist-produce", label: "ARTIST PRODUCE" },
  { value: "music", label: "MUSIC" },
  { value: "live-event", label: "LIVE / EVENT" },
  { value: "creative-direction", label: "CREATIVE DIRECTION" },
];

export const works: Work[] = [
  {
    slug: "yuguremi",
    title: "YUGUREMI",
    year: "2025–",
    category: ["artist-produce", "music", "creative-direction"],
    role: [
      "Artist Produce",
      "Concept Development",
      "Lyrics",
      "Music",
      "Live Direction",
      "Creative Direction",
      "Promotion",
      "Merchandise Planning",
    ],
    description:
      "「終わり」「切なさ」「救われない夜」をテーマに、楽曲、ビジュアル、ライブ、物販、言葉まで一貫して設計するアイドルプロジェクト。",
    concept: "終わってしまった感情に名前をつけに来ました。",
    credits: [
      { label: "Produce", value: "yona / TRACE SILVER" },
      { label: "Music & Lyrics", value: "yona" },
      { label: "Creative Direction", value: "yona" },
    ],
    thumbnail: "/images/works/yuguremi/cover.webp",
    featured: true,
  },
  {
    slug: "retrorain",
    title: "RETRORAIN",
    year: "2025",
    category: ["artist-produce", "music"],
    role: ["Co-Produce", "Music", "Creative Direction"],
    client: "TRACE SILVER × AOHARIUM TOKYO",
    description:
      "雨、記憶、再生を軸にしたアーティストプロジェクト。TRACE SILVER × AOHARIUM TOKYOによる共同プロデュース。",
    concept: "色褪せても、雨だけは鮮やかだ。",
    thumbnail: "/images/works/retrorain/cover.jpg",
    featured: true,
  },
];

/** Lookup a single work by slug. */
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

/**
 * Works sorted for the index: featured first, then newest year first.
 * The authored array order is preserved for ties.
 */
export function getSortedWorks(): Work[] {
  return [...works].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }
    return yearValue(b.year) - yearValue(a.year);
  });
}

/** Adjacent works (previous / next) for the detail page footer. */
export function getAdjacentWorks(slug: string): { prev?: Work; next?: Work } {
  const sorted = getSortedWorks();
  const index = sorted.findIndex((work) => work.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

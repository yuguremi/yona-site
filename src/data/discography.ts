/**
 * Discography — songs yona worked on, grouped by artist and credit role
 * (SPEC §16 "楽曲クレジット" の拡張). Edit this file to add songs/artists.
 *
 * `workSlug` links an artist to its WORKS detail page when one exists.
 * `image` is the artist key visual shown in the WORKS 楽曲提供 list; when
 * omitted a typographic placeholder is rendered.
 */

export type CreditRole = "lyrics-music-arr" | "music-arr" | "arr" | "bgm";

export const creditRoleLabels: Record<CreditRole, string> = {
  "lyrics-music-arr": "Lyrics / Music / Arrangement",
  "music-arr": "Music / Arrangement",
  arr: "Arrangement",
  bgm: "BGM Production",
};

export const creditRoleLabelsJa: Record<CreditRole, string> = {
  "lyrics-music-arr": "作詞・作曲・編曲",
  "music-arr": "作曲・編曲",
  arr: "編曲",
  bgm: "BGM制作",
};

/**
 * A song title, or a title with its release date (YYYY-MM-DD). Dated songs
 * appear in the newest-first credit roll on HOME, so give new releases a
 * date when adding them.
 */
export type SongEntry = string | { title: string; released: string };

export type DiscographyGroup = { role: CreditRole; songs: SongEntry[] };
export type DiscographyArtist = {
  name: string;
  /** Optional link to a /works/<slug> detail page */
  workSlug?: string;
  /** Artist key visual path; falls back to a placeholder when omitted */
  image?: string;
  /** The artist's official website (shown as an external link) */
  site?: string;
  groups: DiscographyGroup[];
};

export const discography: DiscographyArtist[] = [
  {
    name: "YUGUREMI",
    workSlug: "yuguremi",
    image: "/images/works/yuguremi/cover.webp",
    site: "https://yuguremi-web.vercel.app",
    groups: [
      { role: "music-arr", songs: ["CROSS"] },
      {
        role: "lyrics-music-arr",
        songs: [
          { title: "君を忘れるパスワード", released: "2026-11-30" },
          { title: "見えない流星", released: "2026-11-30" },
          { title: "忘却に栞を", released: "2026-11-30" },
          { title: "終夜アングラリア", released: "2025-09-05" },
          { title: "ガラスの夜に", released: "2025-09-05" },
          { title: "未送信二文字", released: "2025-09-14" },
          { title: "ヘイセイパーリナイ", released: "2025-09-05" },
          { title: "デデデDeath", released: "2025-10-10" },
          { title: "ヒューマノイズ", released: "2025-12-06" },
          { title: "Re:sonance", released: "2025-12-18" },
          { title: "全身全霊", released: "2026-01-16" },
          { title: "Just Panic Just Party", released: "2026-02-06" },
          { title: "夜想", released: "2026-04-19" },
          { title: "えんや心中", released: "2026-05-15" },
          "Still With You",
          "夜に惑う",
          "愛逢月",
          "心臓はまだ鳴っている",
        ],
      },
    ],
  },
  {
    name: "RETRORAIN",
    workSlug: "retrorain",
    image: "/images/works/retrorain/cover.jpg",
    site: "https://retrorain-web.vercel.app",
    groups: [
      { role: "music-arr", songs: ["ノボリビ"] },
      {
        role: "lyrics-music-arr",
        songs: [
          "CLOVE BUTTERFLY",
          "サヨナラアナタ",
          "二度目の旅",
          "ラストシーン",
          "アマヤドリ",
          "to Hell together",
          "あの日のワタシ",
          "XXXX",
          "KARASU",
          "青い歌",
          "傘のない君",
          "グッバイレプリカ",
          "痛みを忘れた街で",
          "エスパーじゃないけど",
          "Rewrite the Rain",
          { title: "各駅停車ロマン", released: "2026-09-11" },
        ],
      },
    ],
  },
  {
    name: "AVACLUB",
    image: "/images/works/avaclub/cover.png",
    site: "https://avaclub-web.vercel.app",
    groups: [
      {
        role: "music-arr",
        songs: [
          { title: "コックリーク", released: "2025-01-09" },
          { title: "イルミナティ", released: "2025-01-09" },
          { title: "Hello?", released: "2025-12-26" },
          { title: "MASHIRO", released: "2025-11-28" },
          { title: "MORE", released: "2025-01-16" },
          { title: "Slender", released: "2025-01-16" },
          "Spam!",
          "UMA's Dance",
          { title: "VLaD", released: "2025-10-24" },
          "WW",
          "Delgado",
          "ロンリーハイドアンドシーカー",
          "夏と怪異",
          "遊び半分",
          { title: "SHADOW", released: "2026-08-18" },
        ],
      },
    ],
  },
  {
    name: "アンスリューム",
    image: "/images/discography/anthurium.jpg",
    groups: [
      { role: "arr", songs: ["泥棒猫", "はいどあんどしーく！"] },
      {
        role: "lyrics-music-arr",
        songs: ["夢桜", "アイデンティティクライシス", "明日世界が消える前に"],
      },
    ],
  },
  {
    name: "BOY MEETS HARU",
    image: "/images/discography/boymeetsharu.png",
    groups: [
      { role: "music-arr", songs: ["BOY MEETS HARU", "未完成「ANTHEM」", "溺愛drug"] },
      {
        role: "lyrics-music-arr",
        songs: [
          "Hello world",
          "ユメミガチガール",
          "サヨナラリフレイン",
          "gentle lie",
          "アルメリア",
          "夏のせいにして。",
          "五月空",
          "夕方五時、思い馳せ",
          "UNDER LABO",
          "タラモアの香りと",
          "愛逢月",
          "戯曲：因果律のランデブー",
          "Where TaKe Love",
          "call my name",
          "春の湊",
          "Hello Joker",
          "カスミソウ",
          "ぽつり",
          "拝啓、あの日の少女",
          "From Me to Haru",
          "Vengeance",
          "i love youを君に",
          "SHE is 季節",
          "シュレーディンガーの猫",
          "親愛なるあなたへ",
          "夜に惑う",
          "BOY MEETS THE END",
          "僕のいない明日",
          "Super Star",
          "君のいない昨日",
          "春風",
          "狂花響園",
          "北へ",
          "夜明けラビュー",
          "菜の花冠",
          "I'm millipede",
          "Lovin'it",
          "ニセモノハッピーエンド",
          "LIFE",
          "21:30少し前",
          "Killer Killer",
          "季節の果てで",
          "透明に溺れる",
        ],
      },
    ],
  },
  {
    name: "メガメガミ",
    image: "/images/discography/megamegami.jpg",
    groups: [
      {
        role: "music-arr",
        songs: [
          "アイドルサークル",
          "メガティヌス伝説",
          "WAY TO NIGHT",
          "MEGANIFICENT STORY",
          "VoltA",
          "ネリオンセゾーンシンディ",
        ],
      },
    ],
  },
  {
    name: "われらがプワプワプーワプワ",
    image: "/images/discography/warepuwa.png",
    groups: [
      {
        role: "music-arr",
        songs: [
          "ツインテールトラベラー",
          "イッツアトゥモローワールド",
          "あるてぃめっとらゔおぶざゆにばーす！",
          "教えて♡まいすうぃーと係長♡～アイドル3年戦士地獄の出世物語～",
          "TOOOO LATE！",
        ],
      },
    ],
  },
  {
    name: "MAJIBANCH",
    image: "/images/discography/majibanch.png",
    groups: [
      {
        role: "music-arr",
        songs: ["音楽を止めろ", "才子ちゃんの日常", "NEVERLAND", "生き残れよ、少年少女", "CHEATMANIA"],
      },
    ],
  },
  {
    name: "にしの愛望",
    groups: [
      { role: "bgm", songs: ["「その一歩に、光を」ティザームービー"] },
    ],
  },
  {
    name: "夢幻クレッシェンド",
    groups: [
      {
        role: "music-arr",
        songs: [
          "雨のち晴れ",
          "天気予想",
          "夢幻クレッシェンドの自己紹介ソング",
          "夢幻∞革命",
          "ダンシングクレッシェンド",
          "オドロキオドロック",
          "オウジサマヨ",
          "どっちざ・ワールド",
          "SUMMER SONG",
          "Reach over",
          "I'm so fed up!!",
          "Cider Shower",
        ],
      },
    ],
  },
];

/** The newest release, shown next to the credit roll on HOME. */
export const latestRelease = {
  title: "忘却の観測記録",
  artist: "YUGUREMI",
  format: "CD",
  released: "2026-11-30",
  cover: "/images/releases/boukyaku-no-kansoku-kiroku.jpg",
  tracks: ["君を忘れるパスワード", "見えない流星", "忘却に栞を"],
  credit: "作詞・作曲・編曲",
  href: "/works/yuguremi",
};

export function songTitle(entry: SongEntry): string {
  return typeof entry === "string" ? entry : entry.title;
}

export function songReleased(entry: SongEntry): string | undefined {
  return typeof entry === "string" ? undefined : entry.released;
}

export function artistSongCount(artist: DiscographyArtist): number {
  return artist.groups.reduce((sum, group) => sum + group.songs.length, 0);
}

export function totalSongCount(): number {
  return discography.reduce((sum, artist) => sum + artistSongCount(artist), 0);
}

/** URL-safe anchor id for an artist block on the WORKS page (#credits-…). */
export function artistAnchor(artist: DiscographyArtist): string {
  const index = discography.indexOf(artist);
  const ascii = artist.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `credits-${ascii || `artist-${index + 1}`}`;
}

export type CreditRollItem = {
  title: string;
  artist: string;
  role: CreditRole;
  /** YYYY-MM-DD */
  released: string;
};

/**
 * Dated songs across all artists, newest first (same-day songs keep the
 * order written above). Feeds the credit roll on HOME.
 */
export function getRecentCredits(limit = 16): CreditRollItem[] {
  const items: CreditRollItem[] = [];
  for (const artist of discography) {
    for (const group of artist.groups) {
      for (const entry of group.songs) {
        const released = songReleased(entry);
        if (released) {
          items.push({ title: songTitle(entry), artist: artist.name, role: group.role, released });
        }
      }
    }
  }
  // Array.prototype.sort is stable, so same-day songs keep their written order.
  return items.sort((a, b) => b.released.localeCompare(a.released)).slice(0, limit);
}

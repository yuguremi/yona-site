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

export type DiscographyGroup = { role: CreditRole; songs: string[] };
export type DiscographyArtist = {
  name: string;
  /** Optional link to a /works/<slug> detail page */
  workSlug?: string;
  /** Artist key visual path; falls back to a placeholder when omitted */
  image?: string;
  groups: DiscographyGroup[];
};

export const discography: DiscographyArtist[] = [
  {
    name: "YUGUREMI",
    workSlug: "yuguremi",
    image: "/images/works/yuguremi/cover.webp",
    groups: [
      { role: "music-arr", songs: ["CROSS"] },
      {
        role: "lyrics-music-arr",
        songs: [
          "終夜アングラリア",
          "ガラスの夜に",
          "未送信二文字",
          "ヘイセイパーリナイ",
          "デデデDeath",
          "ヒューマノイズ",
          "Re:sonance",
          "全身全霊",
          "Just Panic Just Party",
          "夜想",
          "えんや心中",
          "Still With You",
          "夜に惑う",
          "愛逢月",
        ],
      },
    ],
  },
  {
    name: "RETRORAIN",
    workSlug: "retrorain",
    image: "/images/works/retrorain/cover.jpg",
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
          "各駅停車ロマン",
        ],
      },
    ],
  },
  {
    name: "AVACLUB",
    workSlug: "avaclub",
    image: "/images/works/avaclub/cover.png",
    groups: [
      {
        role: "music-arr",
        songs: [
          "コックリーク",
          "イルミナティ",
          "Hello?",
          "MASHIRO",
          "MORE",
          "Slender",
          "Spam!",
          "UMA's Dance",
          "VLaD",
          "WW",
          "Delgado",
          "ロンリーハイドアンドシーカー",
          "夏と怪異",
          "遊び半分",
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

export function artistSongCount(artist: DiscographyArtist): number {
  return artist.groups.reduce((sum, group) => sum + group.songs.length, 0);
}

export function totalSongCount(): number {
  return discography.reduce((sum, artist) => sum + artistSongCount(artist), 0);
}

/**
 * Artists highlighted in the HOME "楽曲提供" teaser (curated order, newest first).
 * Edit this list to change which appear on the homepage.
 */
export const featuredSongwriting: string[] = [
  "にしの愛望",
  "メガメガミ",
  "アンスリューム",
  "BOY MEETS HARU",
  "MAJIBANCH",
  "われらがプワプワプーワプワ",
];

export function getFeaturedSongwritingArtists(): DiscographyArtist[] {
  return featuredSongwriting
    .map((name) => discography.find((artist) => artist.name === name))
    .filter((artist): artist is DiscographyArtist => Boolean(artist));
}

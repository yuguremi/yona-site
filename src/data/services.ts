/**
 * Service catalogue (SPEC §4.5).
 * Edit this file to add or revise the services offered.
 */
export type Service = {
  id: string;
  /** Display title (English, used as the headline) */
  title: string;
  /** One-line summary used on the HOME services preview */
  summary: string;
  /** Longer description shown on the SERVICES page (optional) */
  description?: string;
  /** Bullet list of concrete deliverables */
  items: string[];
};

export const services: Service[] = [
  {
    id: "music-production",
    title: "MUSIC PRODUCTION",
    summary: "アーティストの人物像・ライブでの役割・リリース文脈まで含めて楽曲を設計します。",
    description:
      "楽曲単体ではなく、アーティストの人物像、ライブでの役割、リリース文脈まで含めて楽曲を設計します。",
    items: ["作詞", "作曲", "編曲", "楽曲プロデュース", "ボーカルディレクション", "コンセプト設計"],
  },
  {
    id: "artist-produce",
    title: "ARTIST PRODUCE",
    summary: "音楽・ビジュアル・ライブ・物販・発信を一つの物語として統合します。",
    description:
      "音楽、ビジュアル、ライブ、物販、発信を一つの物語として統合し、アーティスト固有の存在理由を設計します。",
    items: [
      "グループコンセプト設計",
      "メンバー・キャラクター設計",
      "リリース計画",
      "ライブ・物販設計",
      "SNS・プロモーション",
      "収益モデル設計",
    ],
  },
  {
    id: "creative-direction",
    title: "CREATIVE DIRECTION",
    summary: "アートワークから写真・MV・衣装・グッズ・言葉まで世界観を統括します。",
    items: [
      "アートディレクション",
      "CDジャケット",
      "アーティスト写真",
      "MV企画",
      "衣装",
      "グッズ",
      "コピーライティング",
    ],
  },
  {
    id: "live-event-design",
    title: "LIVE / EVENT DESIGN",
    summary: "公演コンセプトから演出・特典・会場体験・収支まで一貫して設計します。",
    items: [
      "ワンマン・生誕祭企画",
      "公演コンセプト",
      "セットリスト構成",
      "演出設計",
      "チケット・特典設計",
      "会場体験設計",
      "イベント収支設計",
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

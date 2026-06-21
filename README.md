# yona — Official Website

yona（Music Producer / Creative Director、Founder of TRACE SILVER）の公式ポートフォリオサイト。
黒基調・エディトリアルなトーンで、思想と実績（YUGUREMI / RETRORAIN / AVACLUB ほか）を整理し、
制作・プロデュースの依頼につなげることを目的としています。

> コンセプト: **DIGITAL ARCHIVE OF EMOTIONS** — 感情を、音楽と物語に変える。

---

## 1. 技術スタック

| 領域           | 採用                                                       |
| -------------- | ---------------------------------------------------------- |
| フレームワーク | [Next.js 16](https://nextjs.org/) (App Router)             |
| 言語           | TypeScript                                                 |
| スタイリング   | Tailwind CSS v4（CSS変数 + `@theme`）                      |
| アニメーション | [Motion](https://motion.dev/)（`motion/react`）            |
| フォーム       | React Hook Form + Zod                                      |
| フォント       | Space Grotesk / Noto Sans JP / IBM Plex Mono（`next/font`）|
| メール送信     | Resend REST API（任意・未設定でも動作）                    |
| デプロイ       | Vercel 想定                                                |

主なディレクトリ:

```
src/
  app/            … ルーティング（各ページ / sitemap / robots / manifest / OG画像 / API）
  components/     … layout / home / works / contact / common
  data/           … works.ts / services.ts / socialLinks.ts（編集の中心）
  lib/            … metadata.ts / content.ts / contactSchema.ts / utils.ts
public/images/    … works / profile / og（画像を置く場所）
```

---

## 2. ローカル起動

前提: Node.js 18.18 以上（推奨 20+）。

```bash
npm install        # 依存関係のインストール
npm run dev        # 開発サーバ（http://localhost:3000）
npm run build      # 本番ビルド
npm run start      # ビルド結果を起動
npm run lint       # ESLint
npx tsc --noEmit   # 型チェック
```

---

## 3. 環境変数

`.env.example` をコピーして `.env.local` を作成します。**すべて任意**で、未設定でもビルド・表示は成功します。

| 変数                   | 用途                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap / robots / OG の絶対URL（末尾スラッシュなし）|
| `RESEND_API_KEY`       | 問い合わせメール送信用の Resend APIキー                          |
| `CONTACT_TO_EMAIL`     | 問い合わせの送信先（受信）アドレス                               |
| `CONTACT_FROM_EMAIL`   | 送信元アドレス（Resendで認証済みドメイン）                      |

---

## 4. 作品（WORKS）の追加・編集

作品データは [`src/data/works.ts`](src/data/works.ts) の `works` 配列で管理します。
オブジェクトを1つ追加するだけで一覧・詳細・sitemap に反映されます。

```ts
{
  slug: "new-project",            // URL: /works/new-project（必須・一意）
  title: "NEW PROJECT",
  subtitle: "サブタイトル",        // 任意
  year: "2026",
  category: ["music"],            // "artist-produce" | "music" | "live-event" | "creative-direction"
  role: ["Lyrics", "Music"],
  description: "概要テキスト。",
  concept: "コンセプト。",         // 任意。未入力のセクションは詳細ページで自動的に非表示
  challenge: "課題。",             // 任意
  approach: "アプローチ。",        // 任意
  result: "成果。",                // 任意
  credits: [{ label: "Produce", value: "yona" }], // 任意
  thumbnail: "",                  // 画像未設定なら "" のままでOK（プレースホルダー表示）
  images: [],                     // ギャラリー画像（任意）
  musicUrl: "", videoUrl: "", externalUrl: "", // 任意。空ならボタン非表示
  featured: true,                 // 一覧で上部表示
}
```

- **未入力の項目はセクションごと自動的に非表示**になるため、すべて埋める必要はありません。
- 並び順は「featured優先 → 年の新しい順」。HOMEの "Selected Works" は配列の先頭6件を表示します。

---

## 5. 画像の差し替え

画像未支給の箇所は、黒基調のタイポグラフィ・プレースホルダー（[`Media`](src/components/common/Media.tsx) コンポーネント）が表示されます。実画像への差し替え手順:

1. 画像を `public/images/works/<slug>/` 等に配置（推奨: WebP / AVIF、適切に圧縮）。
2. `src/data/works.ts` の該当作品で `thumbnail`（および `images`）にパスを設定。
   例: `thumbnail: "/images/works/new-project/cover.jpg"`
3. プロフィール画像は `src/components/home/ProfileSummary.tsx` / `src/app/about/page.tsx` の
   `<Media src="" .../>` の `src` にパスを入れます。

パスが空（`""`）の間はプレースホルダー、設定するとそのまま `next/image` で最適化表示されます。
**レイアウト（アスペクト比）は親要素で固定**しているため、差し替えで崩れません。

OG画像は [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) でビルド時に自動生成しています。
固定画像を使いたい場合は同階層に `opengraph-image.(png|jpg)` を置けば差し替わります。

---

## 6. SNSリンクの変更

[`src/data/socialLinks.ts`](src/data/socialLinks.ts) の `href` を実URLに書き換えます。
初期値はプレースホルダー（`#` / 例示メール）です。`href` を `""` にするとそのリンクは非表示になります。
ここを変更すると Header / Footer / モバイルメニュー / 構造化データ（sameAs）に反映されます。

---

## 7. 問い合わせ送信の設定

[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) が送信を処理します。

- **ダミーモード（既定）**: 環境変数が未設定の場合、入力検証のみ行い、内容をサーバログに出力して成功を返します。外部サービス不要で動作します。
- **メール送信モード**: `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` を設定すると、Resend 経由でメール送信します（追加パッケージ不要・REST API利用）。
- 他サービス（Formspree 等）へ切り替える場合は、このルートの送信部分を差し替えてください。
- バリデーションは [`src/lib/contactSchema.ts`](src/lib/contactSchema.ts)（Zod）で client/server 共通。エラーメッセージは日本語、二重送信防止・送信中/成功/失敗状態の表示に対応しています。

---

## 8. Vercel へのデプロイ

1. このリポジトリを GitHub 等にプッシュ。
2. [Vercel](https://vercel.com/) で「New Project」→ リポジトリをインポート（Framework は Next.js が自動検出）。
3. **Environment Variables** に `NEXT_PUBLIC_SITE_URL`（本番URL）と、必要なら Resend 関連を設定。
4. Deploy。以後は push で自動デプロイされます。

CLI を使う場合: `npm i -g vercel` → `vercel` / `vercel --prod`。

---

## 9. デザイン・実装メモ

- カラー / タイポグラフィは [`src/app/globals.css`](src/app/globals.css) の CSS変数・`@theme` で集中管理。
- `prefers-reduced-motion` に全面対応（アニメーションは無効化）。
- アクセシビリティ: semantic HTML、`focus-visible`、フォーム label、モバイルメニューのフォーカストラップ、スキップリンク。
- SEO: metadata API / canonical / OG / Twitter Card / sitemap / robots / manifest / JSON-LD（Person・WebSite・作品ごとの CreativeWork / MusicRecording）。

---

## 10. 今後の拡張候補（未実装・追加しやすい構造）

JOURNAL、楽曲視聴プレイヤー、Spotify / Apple Music / YouTube 埋め込み、CMS連携（microCMS / Sanity 等）、
英語版、ダーク／ライト切り替え、ニュース、自動見積もり、TRACE SILVER 公式サイトとの連携。

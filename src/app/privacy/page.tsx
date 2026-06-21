import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "yona 公式サイトのプライバシーポリシー。お問い合わせ時に取得する情報の取り扱いについて。",
  path: "/privacy",
});

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "取得する情報",
    body: [
      "お問い合わせフォームの送信時に、お名前、メールアドレス、会社・団体名、電話番号、お問い合わせ種別、ご相談内容、希望納期、予算帯、参考URLなど、入力された情報を取得します。",
    ],
  },
  {
    heading: "利用目的",
    body: [
      "取得した情報は、お問い合わせへの回答、ご相談内容の確認、お見積もりやご提案、その後のご連絡のためにのみ利用します。",
    ],
  },
  {
    heading: "第三者提供",
    body: [
      "法令に基づく場合を除き、ご本人の同意なく取得した個人情報を第三者に提供することはありません。",
    ],
  },
  {
    heading: "情報の管理",
    body: [
      "取得した個人情報は、漏洩・滅失・毀損を防ぐため適切に管理し、利用目的の達成に必要な範囲を超えて保有しません。",
    ],
  },
  {
    heading: "お問い合わせ先",
    body: [
      "本ポリシーおよび個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。",
    ],
  },
  {
    heading: "改定",
    body: [
      "本ポリシーの内容は、法令の変更や運用の見直しに応じて予告なく改定する場合があります。改定後の内容は本ページに掲載した時点で効力を生じます。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Container className="pt-32 pb-12 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="text-page-title mt-6 font-display font-semibold">Privacy</h1>
        <p className="mt-6 text-sm text-muted">
          {siteConfig.name} 公式サイト（以下「本サイト」）における個人情報の取り扱いについて、以下のとおり定めます。
        </p>
      </header>

      <div className="mt-16 max-w-2xl space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-medium tracking-tight">
              {section.heading}
            </h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="mt-3 text-sm leading-loose text-foreground/80">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}

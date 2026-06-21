import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "楽曲制作、アーティストプロデュース、クリエイティブディレクション、ライブ／イベント制作のご相談・お問い合わせ。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="pt-32 pb-12 md:pt-40">
      <div className="grid gap-12 md:grid-cols-[22rem_1fr] md:gap-16">
        <header className="md:sticky md:top-28 md:self-start">
          <span className="eyebrow">Contact</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Contact</h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            制作・プロデュースのご相談、出演・取材のご依頼など、
            お気軽にお問い合わせください。内容を確認のうえ折り返しご連絡します。
          </p>
          <p className="mt-6 font-mono text-xs leading-relaxed text-muted">
            <span className="text-danger">*</span> は必須項目です。
          </p>
        </header>

        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}

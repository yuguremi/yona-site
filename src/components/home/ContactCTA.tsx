import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { RevealText } from "@/components/common/RevealText";

type ContactCTAProps = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Reusable closing call-to-action (SPEC §4.1 / §4.3 / §4.5).
 */
export function ContactCTA({
  heading = "制作・プロデュースのご相談",
  body = "楽曲制作、アーティストプロデュース、クリエイティブディレクション、ライブ／イベント制作。内容・スケジュール・予算に応じて個別にご提案します。",
  ctaLabel = "Start a Project",
  ctaHref = "/contact",
}: ContactCTAProps) {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <RevealText className="flex flex-col items-start gap-8">
          <h2 className="text-section-title max-w-2xl font-display font-medium">
            {heading}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted">{body}</p>
          <CtaLink href={ctaHref} variant="solid">
            {ctaLabel}
          </CtaLink>
        </RevealText>
      </Container>
    </section>
  );
}

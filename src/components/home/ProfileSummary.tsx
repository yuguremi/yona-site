import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { RevealText } from "@/components/common/RevealText";
import { Media } from "@/components/common/Media";
import { profileSummary } from "@/lib/content";

/**
 * Profile summary on HOME (SPEC §4.1).
 */
export function ProfileSummary() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <RevealText className="order-2 md:order-1">
            <span className="eyebrow">Profile</span>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              yona
            </h2>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Music Producer / Creative Director
              <br />
              Founder of TRACE SILVER
            </p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/80">
              {profileSummary}
            </p>
            <div className="mt-10">
              <CtaLink href="/about" variant="outline">
                About yona
              </CtaLink>
            </div>
          </RevealText>

          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
              <Media
                src="/images/profile/yona.jpg"
                alt="yona のプロフィールビジュアル"
                title="yona"
                meta="Music Producer / Creative Director"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { RevealText } from "@/components/common/RevealText";
import { SectionHeading } from "@/components/common/SectionHeading";
import { services } from "@/data/services";

/**
 * Services preview on HOME — four domains with a short blurb (SPEC §4.1).
 */
export function ServicesPreview() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What I Do" title="Services" />
          <CtaLink href="/services" variant="ghost">
            All Services
          </CtaLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {services.map((service, index) => (
            <RevealText key={service.id} delay={index * 0.05}>
              <Link
                href="/services"
                className="group flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface md:p-10"
              >
                <span className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
                <span className="mt-auto pt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-foreground">
                  詳細を見る →
                </span>
              </Link>
            </RevealText>
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "音楽制作、アーティストプロデュース、クリエイティブディレクション、ライブ／イベント設計。yonaが提供するサービスのご案内。",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Container className="pt-32 md:pt-40">
        <header className="max-w-3xl">
          <span className="eyebrow">Services</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Services</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            楽曲単体ではなく、アーティストに関わる体験全体を設計します。
            4つの領域を、単独でもプロジェクトとしても承ります。
          </p>
        </header>

        <div className="mt-16 flex flex-col">
          {services.map((service, index) => (
            <RevealText key={service.id}>
              <section className="grid gap-6 border-t border-line py-12 md:grid-cols-[20rem_1fr] md:gap-12 md:py-16">
                <div>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <h2 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-4xl">
                    {service.title}
                  </h2>
                </div>
                <div className="max-w-2xl">
                  {service.description ? (
                    <p className="mb-8 text-base leading-relaxed text-foreground/80">
                      {service.description}
                    </p>
                  ) : null}
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-sm text-foreground/90"
                      >
                        <span aria-hidden="true" className="text-accent">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </RevealText>
          ))}
        </div>
      </Container>

      {/* How to request (SPEC §4.5) */}
      <Container className="mt-20 md:mt-28">
        <div className="max-w-2xl border-t border-line pt-10">
          <span className="eyebrow">How to Request</span>
          <p className="mt-6 text-base leading-loose text-foreground/85">
            楽曲制作は1曲単位、プロデュース・クリエイティブディレクションは
            月額またはプロジェクト単位で承ります。
            <br />
            内容、スケジュール、予算に応じて個別にご提案します。
          </p>
        </div>
      </Container>

      <div className="mt-24 md:mt-32">
        <ContactCTA
          heading="プロジェクトを始める。"
          body="まずはご相談ください。内容・スケジュール・予算に応じて最適なかたちをご提案します。"
          ctaLabel="Start a Project"
        />
      </div>
    </>
  );
}

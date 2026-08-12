import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import { interview } from "@/data/interview";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Interview",
  description:
    "YUGUREMI プロデューサー・yona インタビュー。音楽、クリエイティブ、マーケティング、そして“人生の一部になる景色”について。",
  path: "/interview",
});

export default function InterviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: interview.title,
    description: interview.lead,
    url: `${siteConfig.url}/interview`,
    author: { "@type": "Person", name: "yona" },
    about: "YUGUREMI",
    inLanguage: "ja",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/images/works/yuguremi/cover.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <Container>
          <div className="max-w-4xl pb-16 md:pb-24">
            <span className="eyebrow">{interview.eyebrow}</span>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.15] tracking-tight">
              {interview.title}
            </h1>
            <div className="mt-8 h-px w-full bg-line" />
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
              {interview.lead}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-loose text-muted">
              {interview.intro}
            </p>
            <p className="eyebrow mt-10">{interview.meta}</p>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container>
        <div className="mx-auto max-w-[760px]">
          {interview.sections.map((section) => (
            <RevealText key={section.no}>
              <section className="border-t border-line py-14 md:py-20">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">{section.no}</span>
                  <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                    {section.title}
                  </h2>
                </div>

                <div className="mt-10 space-y-10">
                  {section.qa.map((item) => (
                    <div key={item.q}>
                      <p className="flex gap-3 text-base font-medium leading-relaxed text-foreground">
                        <span aria-hidden="true" className="shrink-0 text-muted">
                          ——
                        </span>
                        <span>{item.q}</span>
                      </p>
                      <div className="mt-4 space-y-4 border-l border-line pl-5">
                        {item.a.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-base leading-loose text-foreground/85"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {section.pullquote ? (
                  <blockquote className="mt-12 border-l-2 border-accent pl-6">
                    <p className="font-display text-xl leading-relaxed tracking-tight text-foreground md:text-3xl">
                      「{section.pullquote}」
                    </p>
                  </blockquote>
                ) : null}
              </section>
            </RevealText>
          ))}

          <div className="border-t border-line py-10">
            <p className="eyebrow">End of interview</p>
          </div>
        </div>
      </Container>

      <ContactCTA
        heading="制作・プロデュースのご相談"
        ctaLabel="Start a Project"
      />
    </>
  );
}

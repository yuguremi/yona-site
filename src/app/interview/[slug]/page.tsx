import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { ExternalLink } from "@/components/common/ExternalLink";
import { VideoEmbed } from "@/components/interview/VideoEmbed";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getInterviewBySlug, visibleInterviews } from "@/data/interviews";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { hasMedia } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return visibleInterviews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getInterviewBySlug(slug);
  if (!item) {
    return createMetadata({ title: "Not Found", path: `/interview/${slug}`, noIndex: true });
  }
  return createMetadata({
    title: `${item.title} | Interview`,
    description: item.lead,
    path: `/interview/${item.slug}`,
  });
}

export default async function InterviewArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getInterviewBySlug(slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.lead,
    url: `${siteConfig.url}/interview/${item.slug}`,
    author: { "@type": "Person", name: "yona" },
    about: item.artist,
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
          {hasMedia(item.image) ? (
            <Image
              src={item.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <Container>
          <div className="max-w-4xl pb-16 md:pb-24">
            <Link
              href="/interview"
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              ← Interview
            </Link>

            <p className="eyebrow mt-8">{item.artist} / Interview</p>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.15] tracking-tight">
              {item.title}
            </h1>
            {item.subtitle ? (
              <p className="mt-5 text-lg leading-relaxed text-accent md:text-2xl">
                {item.subtitle}
              </p>
            ) : null}

            <div className="mt-8 h-px w-full bg-line" />

            <p className="mt-8 max-w-2xl text-sm leading-loose text-foreground/85 md:text-base">
              {item.intro}
            </p>

            <dl className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3.5">
                <dt className="eyebrow pt-0.5">Artist</dt>
                <dd className="text-sm text-foreground/90">{item.artist}</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3.5">
                <dt className="eyebrow pt-0.5">Interviewee</dt>
                <dd className="text-sm text-foreground/90">{item.interviewee}</dd>
              </div>
            </dl>

            {item.kicker ? (
              <p className="mt-8 font-display text-base tracking-tight text-foreground/90 md:text-lg">
                {item.kicker}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Video & links */}
      {item.videoUrl || (item.links && item.links.length > 0) ? (
        <Container>
          <div className="mx-auto max-w-[760px] border-t border-line pt-12 md:pt-16">
            {item.videoUrl ? (
              <VideoEmbed url={item.videoUrl} caption={item.videoCaption} />
            ) : null}

            {item.links && item.links.length > 0 ? (
              <div className="mt-8">
                <p className="eyebrow mb-4">Watch / Listen</p>
                <ul className="flex flex-col divide-y divide-line border-y border-line">
                  {item.links.map((link) => (
                    <li key={link.url}>
                      <ExternalLink
                        href={link.url}
                        className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-foreground"
                      >
                        <span className="flex flex-col gap-1">
                          <span className="text-sm text-foreground/90">{link.label}</span>
                          {link.note ? (
                            <span className="font-mono text-[11px] tracking-[0.12em] text-muted">
                              {link.note}
                            </span>
                          ) : null}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                        >
                          ↗
                        </span>
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      ) : null}

      {/* Body */}
      <Container>
        <div className="mx-auto max-w-[760px]">
          {item.sections.map((section) => (
            <RevealText key={section.no}>
              <section className="border-t border-line py-14 md:py-20">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {section.no}
                  {section.label ? ` / ${section.label}` : ""}
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">
                  {section.title}
                </h2>

                <div className="mt-10 space-y-10">
                  {section.qa.map((qa) => (
                    <div key={qa.q}>
                      <p className="flex gap-3 text-base font-medium leading-relaxed text-foreground">
                        <span aria-hidden="true" className="shrink-0 text-muted">
                          ——
                        </span>
                        <span>{qa.q}</span>
                      </p>
                      <div className="mt-4 space-y-4 border-l border-line pl-5">
                        {qa.a.map((paragraph, index) => (
                          <p key={index} className="text-base leading-loose text-foreground/85">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {section.pullquote ? (
                  <blockquote className="mt-12 border-l-2 border-accent bg-surface/60 py-6 pl-6 pr-4">
                    <p className="font-display text-xl leading-relaxed tracking-tight text-foreground md:text-2xl">
                      「{section.pullquote}」
                    </p>
                  </blockquote>
                ) : null}
              </section>
            </RevealText>
          ))}

          {item.lastWord && item.lastWord.length > 0 ? (
            <RevealText>
              <section className="border-t border-line py-14 md:py-20">
                <p className="eyebrow">Last word</p>
                <blockquote className="mt-6 rounded-sm border border-line bg-surface px-6 py-10 text-center md:px-10 md:py-14">
                  {item.lastWord.map((line, index) => (
                    <p
                      key={index}
                      className="font-display text-xl leading-relaxed tracking-tight text-foreground md:text-3xl"
                    >
                      {index === 0 ? "「" : ""}
                      {line}
                      {index === item.lastWord!.length - 1 ? "」" : ""}
                    </p>
                  ))}
                </blockquote>
              </section>
            </RevealText>
          ) : null}

          <div className="border-t border-line py-10">
            <p className="eyebrow">End of interview</p>
          </div>
        </div>
      </Container>

      <ContactCTA heading="制作・プロデュースのご相談" ctaLabel="Start a Project" />
    </>
  );
}

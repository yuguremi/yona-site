import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { Media } from "@/components/common/Media";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WorkCredits } from "@/components/works/WorkCredits";
import { WorkGallery } from "@/components/works/WorkGallery";
import { WorkMeta } from "@/components/works/WorkMeta";
import {
  categoryLabels,
  getAdjacentWorks,
  getWorkBySlug,
  works,
} from "@/data/works";
import { createMetadata, siteConfig } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return createMetadata({ title: "Not Found", path: `/works/${slug}`, noIndex: true });
  }
  return createMetadata({
    title: work.title,
    description: work.description,
    path: `/works/${work.slug}`,
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const categoryText = work.category.map((c) => categoryLabels[c]).join(" / ");
  const { prev, next } = getAdjacentWorks(work.slug);

  // Only render narrative sections that have content (SPEC §4.3).
  const narrative = [
    { label: "Overview", value: work.description },
    { label: "Concept", value: work.concept },
    { label: "Challenge", value: work.challenge },
    { label: "Approach", value: work.approach },
    { label: "Result", value: work.result },
  ].filter((section): section is { label: string; value: string } => Boolean(section.value));

  // External links — hidden automatically when not provided (SPEC §12).
  const links = [
    { label: "Listen", href: work.musicUrl },
    { label: "Watch", href: work.videoUrl },
    { label: "Visit", href: work.externalUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": work.category.includes("music") ? "MusicRecording" : "CreativeWork",
    name: work.title,
    description: work.description,
    url: `${siteConfig.url}/works/${work.slug}`,
    datePublished: work.year,
    creator: { "@type": "Person", name: "yona" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-32 md:pt-40">
        <Link
          href="/works"
          className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          ← Works
        </Link>

        <header className="mt-8 max-w-4xl">
          <span className="eyebrow">{categoryText}</span>
          <h1 className="text-page-title mt-5 font-display font-semibold">
            {work.title}
          </h1>
          {work.subtitle ? (
            <p className="mt-3 text-lg text-muted">{work.subtitle}</p>
          ) : null}
        </header>
      </Container>

      {/* Main visual */}
      <Container className="mt-12 md:mt-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line md:aspect-[16/8]">
          <Media
            src={work.thumbnail}
            alt={`${work.title} のメインビジュアル`}
            title={work.title}
            meta={`${categoryText} · ${work.year}`}
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
        </div>
      </Container>

      {/* Body: narrative + meta (SPEC §7 — two columns on desktop) */}
      <Container className="mt-16 md:mt-24">
        <div className="grid gap-12 md:grid-cols-[1fr_20rem] md:gap-16">
          <div className="order-2 max-w-2xl space-y-12 md:order-1">
            {narrative.map((section) => (
              <section key={section.label}>
                <h2 className="eyebrow mb-4">{section.label}</h2>
                <p className="text-base leading-loose text-foreground/85 md:text-lg">
                  {section.value}
                </p>
              </section>
            ))}

            <WorkCredits credits={work.credits} />

            {links.length > 0 ? (
              <section>
                <h2 className="eyebrow mb-5">Links</h2>
                <div className="flex flex-wrap gap-3">
                  {links.map((link) => (
                    <CtaLink key={link.label} href={link.href} variant="outline" external>
                      {link.label}
                    </CtaLink>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="order-1 md:order-2">
            <WorkMeta work={work} />
          </aside>
        </div>
      </Container>

      {/* Gallery */}
      {work.images && work.images.length > 0 ? (
        <Container className="mt-16 md:mt-24">
          <WorkGallery images={work.images} title={work.title} />
        </Container>
      ) : null}

      {/* Prev / Next */}
      {prev || next ? (
        <Container className="mt-24">
          <nav
            aria-label="他の作品"
            className="grid grid-cols-2 gap-6 border-t border-line pt-8"
          >
            <div>
              {prev ? (
                <Link href={`/works/${prev.slug}`} className="group block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    ← Prev
                  </span>
                  <p className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-muted">
                    {prev.title}
                  </p>
                </Link>
              ) : null}
            </div>
            <div className="text-right">
              {next ? (
                <Link href={`/works/${next.slug}`} className="group block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Next →
                  </span>
                  <p className="mt-2 font-display text-lg font-medium transition-colors group-hover:text-muted">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </div>
          </nav>
        </Container>
      ) : null}

      <div className="mt-24 md:mt-32">
        <ContactCTA
          heading="このプロジェクトのような制作を。"
          ctaLabel="Start a Project"
        />
      </div>
    </>
  );
}

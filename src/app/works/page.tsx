import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { DiscographyList } from "@/components/works/DiscographyList";
import { WorkCard } from "@/components/works/WorkCard";
import { WorkGrid } from "@/components/works/WorkGrid";
import { WorksExplorer } from "@/components/works/WorksExplorer";
import { getSortedWorks } from "@/data/works";
import { discography, totalSongCount } from "@/data/discography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Works",
  description:
    "yonaが手がけたアーティストプロデュースのプロジェクトと、作詞・作曲・編曲による楽曲提供の一覧。",
  path: "/works",
});

export default function WorksPage() {
  const works = getSortedWorks();

  return (
    <>
      <Container className="pt-32 md:pt-40">
        <header className="max-w-3xl">
          <span className="eyebrow">Portfolio</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Works</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            領域を横断して設計したアーティストプロデュースのプロジェクトと、
            作詞・作曲・編曲として参加した楽曲の記録。
          </p>
        </header>

        {/* Projects */}
        <section className="mt-14 md:mt-16">
          <h2 className="eyebrow mb-6">Projects</h2>
          {/* useSearchParams in WorksExplorer requires a Suspense boundary.
              The fallback renders every work so crawlers still see the list. */}
          <Suspense
            fallback={
              <WorkGrid>
                {works.map((work, index) => (
                  <WorkCard key={work.slug} work={work} priority={index < 3} />
                ))}
              </WorkGrid>
            }
          >
            <WorksExplorer works={works} />
          </Suspense>
        </section>
      </Container>

      {/* Discography */}
      <Container className="mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Songwriting" title="楽曲提供" />
          <span className="font-mono text-xs text-muted">
            {discography.length} artists / {totalSongCount()} songs
          </span>
        </div>
        <div className="mt-10 md:mt-12">
          <DiscographyList />
        </div>
      </Container>

      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </>
  );
}

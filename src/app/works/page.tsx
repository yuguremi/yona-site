import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { DiscographyList } from "@/components/works/DiscographyList";
import { ProjectCard } from "@/components/works/ProjectCard";
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
  const [featured, ...rest] = works;

  return (
    <>
      <Container className="pt-32 md:pt-40">
        <header className="max-w-3xl">
          <span className="eyebrow">Portfolio</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Works</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            領域を横断して設計したアーティストプロデュースのプロジェクトと、
            作詞・作曲・編曲による楽曲提供の記録。
          </p>
        </header>

        {/* Projects — cinematic featured layout */}
        <section className="mt-12 md:mt-16">
          <h2 className="eyebrow mb-6">Projects</h2>
          <div className="flex flex-col gap-5 md:gap-6">
            {featured ? <ProjectCard work={featured} featured priority /> : null}
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                {rest.map((work, index) => (
                  <ProjectCard key={work.slug} work={work} priority={index === 0} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </Container>

      {/* Songwriting credits */}
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

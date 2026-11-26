import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { DiscographyList } from "@/components/works/DiscographyList";
import { ProjectCard } from "@/components/works/ProjectCard";
import { getSortedWorks } from "@/data/works";
import { artistAnchor, discography, totalSongCount } from "@/data/discography";
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
          <h1 className="text-page-title mt-6 font-display">Works</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            領域を横断して設計したアーティストプロデュースのプロジェクトと、
            作詞・作曲・編曲による楽曲提供の記録。
          </p>
        </header>

        {/* Projects — cinematic featured layout */}
        <section className="mt-12 md:mt-16">
          <h2 className="eyebrow mb-6">Projects</h2>
          <div className="flex flex-col gap-16 md:gap-24">
            {featured ? <ProjectCard work={featured} featured priority /> : null}
            {/* A lone remaining project gets the full width instead of half a row. */}
            {rest.length === 1 ? <ProjectCard work={rest[0]} featured /> : null}
            {rest.length > 1 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2">
                {rest.map((work, index) => (
                  <ProjectCard key={work.slug} work={work} priority={index === 0} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </Container>

      {/* Songwriting credits */}
      <section id="credits" className="mt-24 scroll-mt-28 md:mt-32"><Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Songwriting" title="楽曲提供" />
          <div className="flex gap-8"><span><b className="num text-4xl font-normal">{discography.length}</b><small className="ml-2 font-mono text-[10px] tracking-[0.16em] text-muted">ARTISTS</small></span><span><b className="num text-4xl font-normal">{totalSongCount()}</b><small className="ml-2 font-mono text-[10px] tracking-[0.16em] text-muted">SONGS</small></span></div>
        </div>
        <nav aria-label="アーティスト" className="mt-10 flex flex-wrap gap-x-3 gap-y-2">{discography.map((artist, index) => <span key={artist.name} className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><a href={`#${artistAnchor(artist)}`} className="hover:text-foreground">{artist.name}</a>{index < discography.length - 1 ? <span className="ml-3">／</span> : null}</span>)}</nav>
        <div className="mt-10 md:mt-12">
          <DiscographyList />
        </div>
      </Container></section>

      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </>
  );
}

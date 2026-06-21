import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WorkCard } from "@/components/works/WorkCard";
import { WorkGrid } from "@/components/works/WorkGrid";
import { WorksExplorer } from "@/components/works/WorksExplorer";
import { getSortedWorks } from "@/data/works";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Works",
  description:
    "yonaが手がけたアーティストプロデュース、楽曲、ライブ／イベント、クリエイティブディレクションの実績一覧。",
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
            アーティストプロデュース、楽曲、ライブ、クリエイティブディレクション。
            領域を横断して設計したプロジェクトの記録。
          </p>
        </header>

        <div className="mt-14 md:mt-16">
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
        </div>
      </Container>

      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </>
  );
}

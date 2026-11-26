import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { ExternalLink } from "@/components/common/ExternalLink";
import { Media } from "@/components/common/Media";
import { SectionHeading } from "@/components/common/SectionHeading";
import { works } from "@/data/works";

export function SelectedWorks() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="Produce" title="Works" /><CtaLink href="/works" variant="ghost">View All</CtaLink></div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-8">
          {works.map((work, index) => (
            <article key={work.slug}>
              <Link href={`/works/${work.slug}`} className="group block">
                <div className="aspect-[3/2] overflow-hidden"><Media src={work.thumbnail} alt={`${work.title} のキービジュアル`} title={work.title} priority={index < 2} className="transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <div className="mt-5 flex items-baseline justify-between gap-4"><h3 className="truncate font-display text-3xl font-light tracking-tight md:text-4xl">{work.title}</h3><span className="font-mono text-xs text-muted">{work.year}</span></div>
                <p className="eyebrow mt-3">{work.role.slice(0, 3).join(" / ")}</p>
                {work.concept ? <p className="mt-2 text-sm text-muted">{work.concept}</p> : null}
              </Link>
              {work.externalUrl ? <ExternalLink href={work.externalUrl} className="mt-4 inline-block font-mono text-[11px] tracking-[0.18em] text-muted transition-colors hover:text-foreground">公式サイト ↗</ExternalLink> : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

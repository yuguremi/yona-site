import Link from "next/link";
import { ExternalLink } from "@/components/common/ExternalLink";
import { Media } from "@/components/common/Media";
import type { Work } from "@/data/works";
import { cn } from "@/lib/utils";

export function ProjectCard({ work, featured = false, priority = false }: { work: Work; featured?: boolean; priority?: boolean }) {
  return <article>
    <Link href={`/works/${work.slug}`} className="group block">
      <div className={cn("overflow-hidden", featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[3/2]")}><Media src={work.thumbnail} alt={`${work.title} のビジュアル`} priority={priority} sizes={featured ? "(max-width: 1440px) 100vw, 1440px" : "(max-width: 768px) 100vw, 50vw"} className="transition-transform duration-700 group-hover:scale-[1.03]" /></div>
      <div className="mt-6 flex items-baseline justify-between gap-5"><h3 className="font-display text-4xl font-light tracking-tight md:text-6xl">{work.title}</h3><span className="font-mono text-xs text-muted">{work.year}</span></div>
      <p className="eyebrow mt-3">{work.role.slice(0, 3).join(" / ")}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{work.description}</p>
      <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.18em]">View Project →</span>
    </Link>
    {work.externalUrl ? <ExternalLink href={work.externalUrl} className="mt-4 inline-block font-mono text-[11px] tracking-[0.18em] text-muted hover:text-foreground">公式サイト ↗</ExternalLink> : null}
  </article>;
}

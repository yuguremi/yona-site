import Link from "next/link";
import { Media } from "@/components/common/Media";
import { categoryLabels, type Work } from "@/data/works";

/**
 * Work card used on HOME and the WORKS index (SPEC §4.1).
 */
export function WorkCard({ work, priority }: { work: Work; priority?: boolean }) {
  const categoryText = work.category.map((c) => categoryLabels[c]).join(" / ");

  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
        <Media
          src={work.thumbnail}
          alt={`${work.title} のビジュアル`}
          title={work.title}
          meta={`${categoryText} · ${work.year}`}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium tracking-tight">
            {work.title}
          </h3>
          {work.subtitle ? (
            <p className="mt-0.5 truncate text-sm text-muted">{work.subtitle}</p>
          ) : null}
          <p className="eyebrow mt-2">{categoryText}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{work.year}</span>
      </div>

      <p className="mt-2 line-clamp-1 text-xs text-muted">
        {work.role.slice(0, 3).join(" · ")}
      </p>
    </Link>
  );
}

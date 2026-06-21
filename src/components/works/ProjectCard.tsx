import Link from "next/link";
import { Media } from "@/components/common/Media";
import { categoryLabels, type Work } from "@/data/works";
import { cn } from "@/lib/utils";

/**
 * Cinematic, image-forward project card for the WORKS page.
 * The title/category sit over the image with a gradient scrim, so it reads
 * boldly both with a real key visual and with the typographic placeholder.
 */
export function ProjectCard({
  work,
  featured = false,
  priority = false,
}: {
  work: Work;
  featured?: boolean;
  priority?: boolean;
}) {
  const categoryText = work.category.map((c) => categoryLabels[c]).join(" / ");

  return (
    <Link
      href={`/works/${work.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-line"
    >
      <div className={cn(featured ? "aspect-[16/10] md:aspect-[16/7]" : "aspect-[4/3]")}>
        <Media
          src={work.thumbnail}
          alt={`${work.title} のビジュアル`}
          priority={priority}
          sizes={
            featured
              ? "(max-width: 1440px) 100vw, 1440px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* Scrim for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/90"
      />

      {/* Year badge */}
      <span className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.18em] text-foreground/70 md:right-6 md:top-6">
        {work.year}
      </span>

      {/* Overlaid title block */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8",
          featured && "md:p-10",
        )}
      >
        <span className="eyebrow text-foreground/70">{categoryText}</span>
        <h3
          className={cn(
            "font-display font-semibold tracking-tight",
            featured ? "text-4xl md:text-6xl" : "text-2xl md:text-4xl",
          )}
        >
          {work.title}
        </h3>
        {work.subtitle ? (
          <p className="text-sm text-foreground/70">{work.subtitle}</p>
        ) : null}
        <span className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/85">
          View Project
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

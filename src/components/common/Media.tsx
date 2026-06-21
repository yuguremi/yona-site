import Image from "next/image";
import { cn, hasMedia } from "@/lib/utils";

type MediaProps = {
  /** Image path. When empty, a typographic placeholder is shown instead. */
  src?: string;
  alt: string;
  /** Placeholder headline (usually the work title) */
  title?: string;
  /** Placeholder supporting line (usually "Category · Year") */
  meta?: string;
  /** Applied to the (positioned) wrapper element */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a real optimized image when one is supplied, otherwise a black
 * typographic placeholder (dark gradient + grain + title) so missing art
 * never breaks the layout and can be swapped in later (SPEC §11 / §12).
 *
 * The parent controls the aspect ratio; this component fills it.
 */
export function Media({
  src,
  alt,
  title,
  meta,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority,
}: MediaProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
      {hasMedia(src) ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          role="img"
          aria-label={alt}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a18] via-[#0a0d0d] to-[#040404]" />
          <div className="placeholder-grain absolute inset-0 opacity-[0.07]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            {title ? (
              <span className="font-display text-2xl font-medium tracking-tight text-foreground/90 sm:text-3xl">
                {title}
              </span>
            ) : null}
            {meta ? <span className="eyebrow">{meta}</span> : null}
          </div>
        </div>
      )}
    </div>
  );
}

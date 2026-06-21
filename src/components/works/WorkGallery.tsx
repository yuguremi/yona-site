import { Media } from "@/components/common/Media";

/**
 * Work image gallery. Renders nothing when there are no images, so an empty
 * array never produces a stray heading or empty grid (SPEC §12).
 */
export function WorkGallery({ images, title }: { images?: string[]; title: string }) {
  if (!images || images.length === 0) return null;

  return (
    <section>
      <h2 className="eyebrow mb-6">Gallery</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <div
            key={src}
            className="relative aspect-[3/2] overflow-hidden rounded-sm border border-line"
          >
            <Media
              src={src}
              alt={`${title} ギャラリー画像 ${index + 1}`}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

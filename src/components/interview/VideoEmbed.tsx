import { ExternalLink } from "@/components/common/ExternalLink";

/** Extracts the YouTube video id from watch/youtu.be/embed URLs. */
function youTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match ? match[1] : null;
}

/**
 * Privacy-friendly YouTube embed (nocookie) with a caption.
 * Falls back to a plain link when the URL is not a YouTube URL.
 */
export function VideoEmbed({ url, caption }: { url: string; caption?: string }) {
  const id = youTubeId(url);

  if (!id) {
    return (
      <ExternalLink
        href={url}
        className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
      >
        Watch video →
      </ExternalLink>
    );
  }

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={caption ?? "Video"}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] tracking-[0.12em] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

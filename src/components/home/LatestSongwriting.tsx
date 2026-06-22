import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { Media } from "@/components/common/Media";
import { RevealText } from "@/components/common/RevealText";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  artistSongCount,
  creditRoleLabelsJa,
  getFeaturedSongwritingArtists,
} from "@/data/discography";

/**
 * HOME teaser for 楽曲提供 (songs provided to other artists).
 * Shows a few recent/representative artists with their key visual; the full
 * list lives on the WORKS page.
 */
export function LatestSongwriting() {
  const artists = getFeaturedSongwritingArtists();
  if (artists.length === 0) return null;

  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Latest" title="最新の楽曲提供" />
          <CtaLink href="/works" variant="ghost">
            View All
          </CtaLink>
        </div>

        <RevealText className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {artists.map((artist) => {
              const roles = artist.groups
                .map((group) => creditRoleLabelsJa[group.role])
                .join(" / ");
              const count = artistSongCount(artist);
              const href = artist.workSlug ? `/works/${artist.workSlug}` : "/works";

              return (
                <Link key={artist.name} href={href} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
                    <Media
                      src={artist.image}
                      alt={`${artist.name} のアーティスト写真`}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-medium tracking-tight">
                    {artist.name}
                  </h3>
                  <p className="eyebrow mt-1">{roles}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {count} {count === 1 ? "song" : "songs"}
                  </p>
                </Link>
              );
            })}
          </div>
        </RevealText>
      </Container>
    </section>
  );
}

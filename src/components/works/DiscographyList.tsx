import Link from "next/link";
import { Media } from "@/components/common/Media";
import { RevealText } from "@/components/common/RevealText";
import {
  artistSongCount,
  creditRoleLabels,
  creditRoleLabelsJa,
  discography,
} from "@/data/discography";

/**
 * Renders the full discography (songs grouped by artist and credit role).
 * Used inside the WORKS page (SPEC §16 楽曲クレジット).
 */
export function DiscographyList() {
  return (
    <div className="flex flex-col">
      {discography.map((artist) => (
        <RevealText key={artist.name}>
          <section className="border-t border-line py-12 md:py-16">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border border-line sm:w-20 md:w-24">
                <Media
                  src={artist.image}
                  alt={`${artist.name} のアーティスト写真`}
                  sizes="96px"
                />
              </div>
              <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                  {artist.workSlug ? (
                    <Link
                      href={`/works/${artist.workSlug}`}
                      className="underline-offset-4 transition-colors hover:text-muted hover:underline"
                    >
                      {artist.name}
                    </Link>
                  ) : (
                    artist.name
                  )}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {artistSongCount(artist)} songs
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {artist.groups.map((group) => (
                <div key={group.role}>
                  <p className="eyebrow">
                    {creditRoleLabels[group.role]}
                    <span className="ml-2 normal-case tracking-normal text-muted/70">
                      {creditRoleLabelsJa[group.role]}
                    </span>
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.songs.map((song) => (
                      <li
                        key={song}
                        className="flex items-baseline gap-3 text-sm text-foreground/90"
                      >
                        <span aria-hidden="true" className="text-accent">
                          —
                        </span>
                        <span>{song}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </RevealText>
      ))}
    </div>
  );
}

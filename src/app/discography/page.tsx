import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import {
  artistSongCount,
  creditRoleLabels,
  creditRoleLabelsJa,
  discography,
  totalSongCount,
} from "@/data/discography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Discography",
  description:
    "yonaが作詞・作曲・編曲として参加した楽曲の一覧。YUGUREMI、RETRORAIN、AVACLUB、BOY MEETS HARU ほか。",
  path: "/discography",
});

export default function DiscographyPage() {
  const total = totalSongCount();
  const artistCount = discography.length;

  return (
    <>
      <Container className="pt-32 md:pt-40">
        <header className="max-w-3xl">
          <span className="eyebrow">Discography</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Discography</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            作詞・作曲・編曲として参加した楽曲の記録。
            <span className="text-foreground/90">
              {" "}
              {artistCount} artists / {total} songs。
            </span>
          </p>
        </header>

        <div className="mt-12 flex flex-col md:mt-16">
          {discography.map((artist) => (
            <RevealText key={artist.name}>
              <section className="border-t border-line py-12 md:py-16">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
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
                  </h2>
                  <span className="font-mono text-xs text-muted">
                    {artistSongCount(artist)} songs
                  </span>
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
      </Container>

      <div className="mt-16 md:mt-24">
        <ContactCTA
          heading="楽曲制作のご依頼"
          body="作詞・作曲・編曲を1曲単位から承ります。アーティストの世界観に合わせて設計します。"
          ctaLabel="Start a Project"
        />
      </div>
    </>
  );
}

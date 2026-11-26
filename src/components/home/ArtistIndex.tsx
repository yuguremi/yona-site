import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Media } from "@/components/common/Media";
import { SectionHeading } from "@/components/common/SectionHeading";
import { artistAnchor, artistSongCount, creditRoleLabelsJa, discography, totalSongCount } from "@/data/discography";

export function ArtistIndex() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Credits" title="楽曲提供" />
          <div className="flex gap-8"><p><span className="num text-4xl">{discography.length}</span><span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-muted">ARTISTS</span></p><p><span className="num text-4xl">{totalSongCount()}</span><span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-muted">SONGS</span></p></div>
        </div>
        <ul className="mt-12 border-t border-line">
          {discography.map((artist) => {
            const roles = artist.groups.map((group) => creditRoleLabelsJa[group.role]).join(" / ");
            return <li key={artist.name}><Link href={`/works#${artistAnchor(artist)}`} className="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-surface md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_auto_auto] md:gap-8">
              <div className="size-14 overflow-hidden rounded-[2px] md:size-16"><Media src={artist.image} alt={`${artist.name} のビジュアル`} title={artist.name} sizes="64px" className="grayscale transition duration-500 group-hover:grayscale-0" /></div>
              <span className="min-w-0"><span className="block truncate font-display text-2xl font-light tracking-tight md:text-4xl">{artist.name}</span><span className="mt-1 block truncate text-xs text-muted md:hidden">{roles}</span></span>
              <span className="hidden text-xs text-muted md:block">{roles}</span>
              <span className="whitespace-nowrap"><span className="num text-3xl">{artistSongCount(artist)}</span><span className="ml-2 font-mono text-[9px] tracking-[0.16em] text-muted">SONGS</span></span><span aria-hidden="true">→</span>
            </Link></li>;
          })}
        </ul>
      </Container>
    </section>
  );
}

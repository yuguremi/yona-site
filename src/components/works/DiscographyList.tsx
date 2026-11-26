import Link from "next/link";
import { ExternalLink } from "@/components/common/ExternalLink";
import { Media } from "@/components/common/Media";
import { artistAnchor, artistSongCount, creditRoleLabels, creditRoleLabelsJa, discography, latestRelease, songReleased, songTitle } from "@/data/discography";

export function DiscographyList() {
  return <div>{discography.map((artist) => <section id={artistAnchor(artist)} key={artist.name} className="scroll-mt-28 border-t border-line py-12 md:py-16">
    <div className="flex items-start gap-4 md:gap-6"><div className="size-16 shrink-0 overflow-hidden rounded-[2px] md:size-[5.5rem]"><Media src={artist.image} alt={`${artist.name} のアーティスト写真`} sizes="88px" /></div>
      <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="truncate font-display text-3xl font-light tracking-tight md:text-5xl">{artist.workSlug ? <Link href={`/works/${artist.workSlug}`} className="hover:text-muted">{artist.name}</Link> : artist.name}</h3><div className="mt-3 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.16em] text-muted">{artist.site ? <ExternalLink href={artist.site}>公式サイト ↗</ExternalLink> : null}{artist.workSlug ? <Link href={`/works/${artist.workSlug}`}>PROJECT →</Link> : null}</div></div><p className="shrink-0"><span className="num text-4xl">{artistSongCount(artist)}</span><span className="ml-2 font-mono text-[9px] tracking-[0.16em] text-muted">SONGS</span></p></div></div>
    </div>
    <div className="mt-8 space-y-8">{artist.groups.map((group) => <div key={group.role}><p className="eyebrow">{creditRoleLabels[group.role]} <span className="ml-2 normal-case tracking-normal">{creditRoleLabelsJa[group.role]}</span></p><ul className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">{group.songs.map((entry) => { const title = songTitle(entry); const released = songReleased(entry); const isNew = released === latestRelease.released; return <li key={`${group.role}-${title}`} className="flex min-w-0 items-baseline gap-2 border-b border-line py-2.5">{isNew ? <span className="font-mono text-[9px] text-accent">NEW</span> : null}<span className="min-w-0 flex-1 truncate text-sm md:text-[0.95rem]">{title}</span>{released ? <span className="font-mono text-[10px] text-muted">{released.replaceAll("-", ".").slice(0, 7)}</span> : null}</li>; })}</ul></div>)}</div>
  </section>)}</div>;
}

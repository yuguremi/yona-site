import Image from "next/image";
import Link from "next/link";
import { creditRoleLabelsJa, getRecentCredits, latestRelease, totalSongCount } from "@/data/discography";

const credits = getRecentCredits(16);
const date = (value: string) => value.replaceAll("-", ".");

function CreditRows({ copy = false }: { copy?: boolean }) {
  return (
    <ol aria-label={copy ? undefined : "最近の楽曲クレジット（新しい順）"} aria-hidden={copy || undefined} className={copy ? "credit-roll-copy" : undefined}>
      {credits.map((credit, index) => {
        const isNew = credit.released === latestRelease.released;
        return (
          <li key={`${copy ? "copy-" : ""}${credit.artist}-${credit.title}-${index}`} className="grid grid-cols-[4.25rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-4">
            <span className={`font-mono text-[11px] ${isNew ? "text-accent" : "text-muted"}`}>{date(credit.released).slice(0, 7)}</span>
            <span className="min-w-0">
              <span className="flex min-w-0 items-baseline gap-2">
                {isNew ? <span className="shrink-0 font-mono text-[9px] text-accent">NEW</span> : null}
                <span className="truncate text-lg font-medium md:text-xl">{credit.title}</span>
              </span>
              <span className="mt-1 block text-xs text-muted">{creditRoleLabelsJa[credit.role]}</span>
            </span>
            <span className="max-w-[6rem] truncate text-right font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:max-w-[9rem]">{credit.artist}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function CreditRoll() {
  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <div className="flex justify-between border-b border-line-strong pb-3 font-mono text-[10px] tracking-[0.22em] text-muted md:text-[11px]"><span>CREDITS</span><span>NEWEST FIRST</span></div>
      <Link href={latestRelease.href} className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 border-b border-line py-5">
        <Image src={latestRelease.cover} alt={`「${latestRelease.title}」ジャケット`} width={88} height={88} className="size-[5.5rem] rounded-[2px] object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="min-w-0">
          <span className="block font-mono text-[10px] tracking-[0.14em] text-accent">NEW · {date(latestRelease.released)} · {latestRelease.format}</span>
          <span className="mt-1 block font-display text-2xl font-light tracking-tight md:text-3xl">「{latestRelease.title}」</span>
          <span className="mt-1 block font-mono text-[10px] tracking-[0.12em] text-muted">{latestRelease.artist} · {latestRelease.tracks.length} SONGS</span>
          <span className="mt-2 block truncate text-xs text-muted">{latestRelease.tracks.join("／")}</span>
        </span>
      </Link>
      {/* On lg the viewport is absolutely placed so the list never sets the hero's height. */}
      <div className="relative lg:min-h-[20rem] lg:flex-1">
        <div className="credit-roll-viewport relative h-[24rem] overflow-hidden md:h-[28rem] lg:absolute lg:inset-0 lg:h-auto" style={{ maskImage: "linear-gradient(to bottom, transparent 0, #000 6%, #000 78%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 6%, #000 78%, transparent 100%)" }}>
          <div className="credit-roll-track"><CreditRows /><CreditRows copy /></div>
        </div>
      </div>
      <Link href="/works#credits" className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground">全{totalSongCount()}曲のクレジット →</Link>
    </div>
  );
}

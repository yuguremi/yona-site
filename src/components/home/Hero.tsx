import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { CreditRoll } from "./CreditRoll";
import { discography, totalSongCount } from "@/data/discography";
import { works } from "@/data/works";
import { siteConfig } from "@/lib/metadata";

const stats = [
  { value: totalSongCount(), label: "SONGS", accent: true },
  { value: discography.length, label: "ARTISTS" },
  { value: works.length, label: "PRODUCED GROUPS" },
];

export function Hero() {
  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-32 lg:pb-12 lg:pt-28">
      <Container className="grid items-stretch gap-16 lg:min-h-[calc(100svh-10rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex min-w-0 flex-col lg:justify-between">
          <div>
            <p className="eyebrow">MUSIC PRODUCER — COMPOSER — CREATIVE DIRECTOR</p>
            <h1 className="text-hero -ml-[0.06em] mt-8 font-display">yona</h1>
            <p className="mt-10 text-xl font-medium tracking-[0.08em] md:mt-14 md:text-2xl">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 font-mono text-[10px] tracking-[0.22em] text-muted">{stat.label}</dt>
                  <dd className={`num text-6xl md:text-7xl ${stat.accent ? "text-accent" : ""}`}>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Image src="/images/profile/yona.jpg" alt="yona のプロフィールアート" width={48} height={48} className="size-12 rounded-[2px] object-cover" />
              <CtaLink href="/contact">Start a Project</CtaLink>
              <Link href="/works#credits" className="font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:text-muted">All Credits →</Link>
            </div>
          </div>
        </div>
        <CreditRoll />
      </Container>
    </section>
  );
}

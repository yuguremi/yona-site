import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { ExternalLink } from "@/components/common/ExternalLink";
import { socialLinks } from "@/data/socialLinks";
import { profileSummary, statementBody, traceSilver } from "@/lib/content";

export function Profile() {
  const x = socialLinks[0];
  return (
    <section id="profile" className="border-t border-line py-24 md:py-32">
      <Container className="grid items-start gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-20">
        <div className="max-w-[26rem]"><Image src="/images/profile/yona.jpg" alt="yona のプロフィールアート" width={400} height={400} className="aspect-square w-full rounded-[2px] object-cover" /><p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-muted">PROFILE ART</p></div>
        <div>
          <p className="eyebrow flex items-center gap-2"><span className="size-1.5 bg-accent-cool" />Profile</p>
          <h2 className="text-section-title mt-5 font-display">yona</h2>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted">MUSIC PRODUCER / COMPOSER / CREATIVE DIRECTOR</p>
          <p className="mt-8 text-base leading-loose text-foreground/85">{profileSummary}</p>
          <p className="mt-5 text-sm leading-loose text-muted">{statementBody.at(-1)?.join("")}</p>
          <dl className="mt-10 border-t border-line">
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5"><dt className="eyebrow">Company</dt><dd><ExternalLink href={traceSilver.url} className="text-sm transition-colors hover:text-muted">TRACE SILVER ↗</ExternalLink><p className="mt-2 text-xs leading-relaxed text-muted">{traceSilver.body}</p></dd></div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5"><dt className="eyebrow">Produce</dt><dd className="text-sm"><Link href="/works/yuguremi" className="hover:text-muted">YUGUREMI</Link> ・ <Link href="/works/retrorain" className="hover:text-muted">RETRORAIN</Link></dd></div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5"><dt className="eyebrow">X</dt><dd><ExternalLink href={x.href} className="text-sm hover:text-muted">{x.handle} ↗</ExternalLink></dd></div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

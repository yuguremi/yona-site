import Link from "next/link";
import { Container } from "@/components/common/Container";
import { ExternalLink } from "@/components/common/ExternalLink";
import { navItems } from "./nav";
import { socialLinks } from "@/data/socialLinks";
import { traceSilver } from "@/lib/content";
import { siteConfig } from "@/lib/metadata";

export function Footer() {
  const year = new Date().getFullYear();
  const x = socialLinks[0];
  return (
    <footer className="mt-0 border-t border-line pt-16 md:pt-20">
      <Container><p aria-hidden="true" className="font-display text-[clamp(6rem,24vw,22rem)] font-[250] leading-[.8] tracking-[-.055em]">yona</p>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div><p className="eyebrow">{siteConfig.role}</p><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.tagline}</p></div>
          <nav aria-label="フッターナビゲーション"><p className="eyebrow mb-4">Menu</p><ul className="flex flex-col gap-2.5">{navItems.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-muted transition-colors hover:text-foreground">{item.label}</Link></li>)}</ul></nav>
          <div><p className="eyebrow mb-4">Links</p><ul className="flex flex-col gap-2.5"><li><ExternalLink href={x.href} className="text-sm text-muted hover:text-foreground">X {x.handle} ↗</ExternalLink></li><li><ExternalLink href={traceSilver.url} className="text-sm text-muted hover:text-foreground">TRACE SILVER ↗</ExternalLink></li></ul></div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"><p className="font-mono tracking-wide">© {year} yona / TRACE SILVER</p><Link href="/privacy" className="font-mono tracking-wide transition-colors hover:text-foreground">PRIVACY POLICY</Link></Container>
    </footer>
  );
}

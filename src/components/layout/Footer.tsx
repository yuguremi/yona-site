import Link from "next/link";
import { Container } from "@/components/common/Container";
import { ExternalLink } from "@/components/common/ExternalLink";
import { navItems } from "./nav";
import { socialLinks } from "@/data/socialLinks";
import { siteConfig } from "@/lib/metadata";

/**
 * Site footer (SPEC §5.2): identity, social links, sitemap, copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = socialLinks.length > 0;

  return (
    <footer className="mt-32 border-t border-line">
      <Container
        className={`grid gap-12 py-16 md:py-20 ${
          hasSocial ? "md:grid-cols-[1.5fr_1fr_1fr]" : "md:grid-cols-[1.5fr_1fr]"
        }`}
      >
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">yona</p>
          <p className="eyebrow mt-3">{siteConfig.role}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="フッターナビゲーション">
          <p className="eyebrow mb-4">Menu</p>
          <ul className="flex flex-col gap-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {hasSocial ? (
          <div>
            <p className="eyebrow mb-4">Social</p>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <ExternalLink
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono tracking-wide">© {year} yona / TRACE SILVER</p>
        <Link href="/privacy" className="font-mono tracking-wide transition-colors hover:text-foreground">
          PRIVACY POLICY
        </Link>
      </Container>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/common/Container";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./nav";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/data/socialLinks";

/**
 * Sticky site header (SPEC §5.1):
 * transparent at the top, semi-opaque black with subtle blur after scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-colors duration-300",
        scrolled ? "border-b border-line bg-background/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-foreground"
        >
          yona
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="メインナビゲーション">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const baseHref = item.href.split("#")[0];
              const active = item.label !== "CREDITS" && (pathname === baseHref || pathname.startsWith(`${baseHref}/`));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-foreground",
                      active ? "text-foreground underline decoration-1 underline-offset-[6px]" : "text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li><a href={socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="X（@yona_framyn）を新しいタブで開く" className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground">X ↗</a></li>
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span
              className={cn(
                "h-px w-full bg-foreground transition-transform duration-300",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-foreground transition-opacity duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-foreground transition-transform duration-300",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

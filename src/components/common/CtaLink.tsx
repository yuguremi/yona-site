import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] " +
  "transition-colors duration-300 focus-visible:outline-2";

const variants: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  solid:
    "rounded-full bg-foreground px-6 py-3.5 text-background hover:bg-foreground/85",
  outline:
    "rounded-full border border-line px-6 py-3.5 text-foreground hover:border-foreground/60 hover:bg-white/[0.03]",
  ghost: "text-foreground hover:text-muted",
};

/**
 * Primary call-to-action link with a small animated arrow.
 * `external` switches between next/link and a plain anchor.
 */
export function CtaLink({
  href,
  children,
  variant = "solid",
  external,
  className,
}: CtaLinkProps) {
  const classes = cn(base, variants[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

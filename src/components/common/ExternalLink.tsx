import type { ReactNode } from "react";

type ExternalLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/**
 * Safe external link. Renders nothing when `href` is missing/empty so that
 * un-configured links (e.g. a work without a music URL) simply disappear
 * instead of producing dead buttons (SPEC §12).
 *
 * `mailto:` / `tel:` links open in the same context; web URLs open in a new
 * tab with rel="noopener noreferrer".
 */
export function ExternalLink({ href, children, className, ...rest }: ExternalLinkProps) {
  if (!href || href.trim() === "") return null;

  const isInPageOrProtocol = /^(mailto:|tel:|#)/.test(href);

  if (isInPageOrProtocol) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

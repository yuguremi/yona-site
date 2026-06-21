import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";

/**
 * Custom 404 (SPEC §12).
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[100svh] flex-col items-center justify-center text-center">
      <span className="font-display text-[clamp(5rem,22vw,16rem)] font-semibold leading-none">
        404
      </span>
      <p className="eyebrow mt-4">This memory does not exist.</p>
      <p className="mt-6 text-base text-muted">ページが見つかりませんでした。</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <CtaLink href="/" variant="solid">
          Home
        </CtaLink>
        <Link
          href="/works"
          className="inline-flex items-center font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          View Works →
        </Link>
      </div>
    </Container>
  );
}

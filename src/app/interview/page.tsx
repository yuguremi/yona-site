import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Media } from "@/components/common/Media";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import { visibleInterviews } from "@/data/interviews";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Interview",
  description:
    "yona のインタビュー。楽曲やプロジェクトの制作背景、音楽、クリエイティブ、そして届けたい景色について。",
  path: "/interview",
});

export default function InterviewIndexPage() {
  return (
    <>
      <Container className="pt-32 md:pt-40">
        <header className="max-w-3xl">
          <span className="eyebrow">Interview</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">Interview</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            楽曲やプロジェクトの制作背景、そのときに考えていたこと。
            言葉として残しているインタビューの記録。
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-5 md:mt-16 md:gap-6">
          {visibleInterviews.map((item, index) => (
            <RevealText key={item.slug}>
              <Link
                href={`/interview/${item.slug}`}
                className="group grid gap-6 overflow-hidden rounded-sm border border-line md:grid-cols-[20rem_1fr]"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:h-full md:min-h-[15rem]">
                  <Media
                    src={item.image}
                    alt={`${item.artist} のビジュアル`}
                    title={item.artist}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 20rem"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 pt-0 md:p-8 md:pl-0">
                  <span className="eyebrow">{item.artist} / Interview</span>
                  <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">
                    {item.title}
                  </h2>
                  {item.subtitle ? (
                    <p className="mt-2 text-sm text-accent md:text-base">{item.subtitle}</p>
                  ) : null}
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                    {item.lead}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/85">
                    Read Interview
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </RevealText>
          ))}
        </div>
      </Container>

      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </>
  );
}

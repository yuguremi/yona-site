import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Media } from "@/components/common/Media";
import { RevealText } from "@/components/common/RevealText";
import { ContactCTA } from "@/components/home/ContactCTA";
import {
  activityDomains,
  profileSummary,
  statementBody,
  statementHeading,
  traceSilver,
} from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "yona — Music Producer / Creative Director、Founder of TRACE SILVER。作詞作曲からアーティストプロデュース、ライブ設計、ビジュアル、事業運営まで横断して設計。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Profile visual */}
      <Container className="pt-32 md:pt-40">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-line">
          <Media
            src="/images/profile/yona.jpg"
            alt="yona のプロフィールビジュアル"
            title="yona"
            meta="Music Producer / Creative Director"
            sizes="(max-width: 768px) 100vw, 28rem"
            priority
          />
        </div>
      </Container>

      <Container className="mt-16 md:mt-24">
        <div className="max-w-3xl">
          <span className="eyebrow">About</span>
          <h1 className="text-page-title mt-6 font-display font-semibold">yona</h1>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Music Producer / Creative Director
            <br />
            Founder of TRACE SILVER
          </p>

          <p className="mt-10 text-base leading-loose text-foreground/85 md:text-lg">
            {profileSummary}
          </p>

          <div className="mt-12 border-t border-line pt-10">
            <h2 className="text-section-title font-display font-medium">
              {statementHeading}
            </h2>
            <div className="mt-8 space-y-6 text-base leading-loose text-foreground/80 md:text-lg">
              {statementBody.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.map((line, lineIndex) => (
                    <span key={lineIndex} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Activity domains */}
      <Container className="mt-20 md:mt-28">
        <span className="eyebrow">Field</span>
        <h2 className="sr-only">活動領域</h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {activityDomains.map((domain) => (
            <li
              key={domain}
              className="font-display text-2xl font-medium tracking-tight text-foreground/90 md:text-4xl"
            >
              {domain}
            </li>
          ))}
        </ul>
      </Container>

      {/* TRACE SILVER */}
      <Container className="mt-20 md:mt-28">
        <RevealText className="max-w-3xl border-t border-line pt-10">
          <span className="eyebrow">Organization</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {traceSilver.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-loose text-foreground/80">
            {traceSilver.body}
          </p>
        </RevealText>
      </Container>

      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </>
  );
}

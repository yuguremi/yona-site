"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";

const disciplines = [
  "Music Production",
  "Artist Produce",
  "Creative Direction",
  "Live & Story Design",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * HOME hero (SPEC §4.1). Black background, faint glow, restrained REC /
 * timecode marks, and a one-time staggered text reveal that respects
 * prefers-reduced-motion and never blocks scrolling.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? "show" : "hidden";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Background — generated atmospheric key art + dark scrim for legibility */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/15 to-transparent" />
      </div>

      {/* Recording marks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute right-5 top-20 font-mono text-[10px] tracking-[0.3em] text-muted md:right-10 md:top-24">
          <span className="text-[var(--accent-warm)]">●</span> REC
        </span>
        <span className="absolute bottom-8 left-5 font-mono text-[10px] tracking-[0.3em] text-muted md:left-10">
          00:00:00:01
        </span>
        <span className="absolute bottom-8 right-5 font-mono text-[10px] tracking-[0.3em] text-muted md:right-10">
          DIGITAL ARCHIVE
        </span>
      </div>

      <Container>
        <motion.div variants={container} initial={initial} animate="show" className="max-w-4xl">
          <motion.p variants={item} className="eyebrow">
            Digital Archive of Emotions
          </motion.p>

          <motion.h1
            variants={item}
            className="text-hero mt-6 font-display font-semibold"
          >
            yona
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-mono text-sm uppercase tracking-[0.28em] text-foreground/80 sm:text-base"
          >
            Music Producer
            <br />
            Creative Director
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-xl leading-relaxed text-foreground sm:text-2xl"
          >
            感情を、音楽と物語に変える。
          </motion.p>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.16em] text-muted"
          >
            {disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-12 flex flex-wrap gap-4">
            <CtaLink href="/works" variant="solid">
              View Works
            </CtaLink>
            <CtaLink href="/contact" variant="outline">
              Contact
            </CtaLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

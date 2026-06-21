"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealTextProps = {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper: subtle fade + small Y move when entering the
 * viewport once (SPEC §6.7). Fully disabled under prefers-reduced-motion.
 */
export function RevealText({ children, delay = 0, className }: RevealTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

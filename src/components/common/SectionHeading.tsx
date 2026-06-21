import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label above the title */
  eyebrow?: string;
  title: ReactNode;
  as?: ElementType;
  size?: "section" | "page";
  className?: string;
  children?: ReactNode;
};

/**
 * Reusable editorial section heading (eyebrow + large display title).
 */
export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  size = "section",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag
        className={cn(
          "font-display font-medium",
          size === "page" ? "text-page-title" : "text-section-title",
        )}
      >
        {title}
      </Tag>
      {children}
    </div>
  );
}

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Page width wrapper (SPEC §6.4): max 1440px with responsive side padding
 * (mobile 20px / tablet 40px / desktop 80px).
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20", className)}>
      {children}
    </Tag>
  );
}

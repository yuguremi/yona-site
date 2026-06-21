import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Responsive works grid (SPEC §7): 1 col mobile / 2 col tablet / 3 col desktop.
 */
export function WorkGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

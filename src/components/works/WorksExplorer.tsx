"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WorkCard } from "./WorkCard";
import { WorkGrid } from "./WorkGrid";
import { categoryFilters, type Work, type WorkCategory } from "@/data/works";
import { cn } from "@/lib/utils";

/**
 * Client-side category filter for the WORKS index (SPEC §4.2).
 * Filtering is instant and the active category is reflected in the URL
 * (?category=...) so views are shareable and back/forward works.
 */
export function WorksExplorer({ works }: { works: Work[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requested = searchParams.get("category");
  const active = categoryFilters.some((f) => f.value === requested)
    ? (requested as WorkCategory | "all")
    : "all";

  const filtered = useMemo(() => {
    if (active === "all") return works;
    return works.filter((work) => work.category.includes(active as WorkCategory));
  }, [active, works]);

  const handleSelect = (value: WorkCategory | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div>
      <div
        role="group"
        aria-label="カテゴリで絞り込み"
        className="flex flex-wrap gap-2"
      >
        {categoryFilters.map((filter) => {
          const isActive = filter.value === active;
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(filter.value)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-muted hover:border-foreground/50 hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-mono text-xs text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "work" : "works"}
      </p>

      {filtered.length > 0 ? (
        <WorkGrid className="mt-8">
          {filtered.map((work, index) => (
            <WorkCard key={work.slug} work={work} priority={index < 3} />
          ))}
        </WorkGrid>
      ) : (
        <p className="mt-16 text-center text-sm text-muted">
          該当する作品がまだありません。
        </p>
      )}
    </div>
  );
}

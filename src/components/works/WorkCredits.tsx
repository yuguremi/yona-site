import type { Work } from "@/data/works";

/**
 * Credits table. Renders nothing when no credits are supplied (SPEC §4.3).
 */
export function WorkCredits({ credits }: { credits?: Work["credits"] }) {
  if (!credits || credits.length === 0) return null;

  return (
    <section>
      <h2 className="eyebrow mb-6">Credits</h2>
      <dl className="flex flex-col divide-y divide-line border-t border-line">
        {credits.map((credit) => (
          <div key={`${credit.label}-${credit.value}`} className="grid grid-cols-[8rem_1fr] gap-4 py-3.5">
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {credit.label}
            </dt>
            <dd className="text-sm text-foreground/90">{credit.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { categoryLabels, type Work } from "@/data/works";

/**
 * Meta block for the work detail page: category, year, role, client.
 */
export function WorkMeta({ work }: { work: Work }) {
  const rows: { label: string; value: string }[] = [
    { label: "Category", value: work.category.map((c) => categoryLabels[c]).join(" / ") },
    { label: "Year", value: work.year },
    { label: "Role", value: work.role.join(", ") },
  ];

  if (work.client) {
    rows.push({ label: "Client", value: work.client });
  }

  return (
    <dl className="flex flex-col divide-y divide-line border-y border-line">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
          <dt className="eyebrow pt-0.5">{row.label}</dt>
          <dd className="text-sm leading-relaxed text-foreground/90">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

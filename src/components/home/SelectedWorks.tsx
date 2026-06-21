import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { RevealText } from "@/components/common/RevealText";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/works/WorkCard";
import { WorkGrid } from "@/components/works/WorkGrid";
import { works } from "@/data/works";

/**
 * "Selected Works" section on HOME (SPEC §4.1).
 */
export function SelectedWorks() {
  const selected = works.slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected Works" title="Works" />
          <CtaLink href="/works" variant="ghost">
            View All
          </CtaLink>
        </div>

        <RevealText className="mt-12 md:mt-16">
          <WorkGrid>
            {selected.map((work, index) => (
              <WorkCard key={work.slug} work={work} priority={index < 3} />
            ))}
          </WorkGrid>
        </RevealText>
      </Container>
    </section>
  );
}

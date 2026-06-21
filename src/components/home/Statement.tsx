import { Container } from "@/components/common/Container";
import { RevealText } from "@/components/common/RevealText";
import { statementBody, statementHeading } from "@/lib/content";

/**
 * Brand statement section (SPEC §4.1 / §2.4).
 */
export function Statement() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <RevealText>
            <span className="eyebrow">Statement</span>
            <h2 className="text-section-title mt-6 font-display font-medium">
              {statementHeading}
            </h2>
          </RevealText>

          <RevealText delay={0.1} className="mt-10 space-y-6 text-base leading-loose text-foreground/80 md:text-lg">
            {statementBody.map((paragraph, index) => (
              <p key={index}>
                {paragraph.map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </RevealText>
        </div>
      </Container>
    </section>
  );
}

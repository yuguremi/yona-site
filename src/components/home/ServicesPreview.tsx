import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { SectionHeading } from "@/components/common/SectionHeading";
import { services } from "@/data/services";

export function ServicesPreview() {
  return (
    <section className="border-t border-line py-24 md:py-32"><Container>
      <div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="What I Do" title="Services" /><CtaLink href="/services" variant="ghost">All Services</CtaLink></div>
      <ul className="mt-12 border-t border-line">{services.map((service) => <li key={service.id}><Link href="/services" className="group grid items-baseline gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] md:gap-10"><h3 className="font-display text-2xl font-light tracking-tight md:text-4xl">{service.title}</h3><p className="text-sm leading-relaxed text-muted">{service.summary}</p><span className="transition-transform group-hover:translate-x-1">→</span></Link></li>)}</ul>
    </Container></section>
  );
}

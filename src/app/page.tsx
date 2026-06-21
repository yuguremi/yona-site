import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { Statement } from "@/components/home/Statement";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProfileSummary } from "@/components/home/ProfileSummary";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <Statement />
      <ServicesPreview />
      <ProfileSummary />
      <ContactCTA />
    </>
  );
}

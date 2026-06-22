import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { LatestSongwriting } from "@/components/home/LatestSongwriting";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <LatestSongwriting />
      <ServicesPreview />
      <ContactCTA />
    </>
  );
}

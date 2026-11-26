import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { ArtistIndex } from "@/components/home/ArtistIndex";
import { Profile } from "@/components/home/Profile";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <ArtistIndex />
      <Profile />
      <ServicesPreview />
      <ContactCTA />
    </>
  );
}

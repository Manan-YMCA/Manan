import { AboutSection } from "@/components/home/AboutSection";
import { GallerySection } from "@/components/home/GallerySection";
import { HomeHero } from "@/components/home/HomeHero";
import { PastEvents } from "@/components/home/PastEvents";
import { SpecialtiesMarquee } from "@/components/home/SpecialtiesMarquee";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";

export function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <HomeHero />
      <SpecialtiesMarquee />

      <div className="mx-auto border-x">
        <AboutSection />
        <UpcomingEvents />
        <PastEvents />
        <GallerySection />
      </div>
    </div>
  );
}

export default Home;

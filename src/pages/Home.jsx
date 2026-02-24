import DestinationsSection from "../components/sections/DestinationsSection/DestinationsSection";
import ExperienceSection from "../components/sections/ExperienceSection/ExperienceSection";
import FooterSection from "../components/sections/FooterSection/FooterSection";
import HadaraSection from "../components/sections/HadaraSection/HadaraSection";
import HeritageSection from "../components/sections/HeritageSection/HeritageSection";
import HeroSection from "../components/sections/HeroSection/HeroSection";
import IdentitySection from "../components/sections/IdentitySection/IdentitySection";
import MassageSection from "../components/sections/MassageSection/MassageSection";
import RoomSection from "../components/sections/RoomSection/RoomSection";
import VisionSection from "../components/sections/VisionSection/VisionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HadaraSection />
      <ExperienceSection />
      <IdentitySection />
      <DestinationsSection />
      <HeritageSection />
      <VisionSection />
      <MassageSection />
      <RoomSection />
      <FooterSection />
    </>
  );
}

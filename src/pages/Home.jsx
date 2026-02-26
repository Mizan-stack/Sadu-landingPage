import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditableSection } from "../components/common/EditableSection";
import HeroSection from "../components/sections/HeroSection/HeroSection";

const HadaraSection = lazy(() =>
  import("../components/sections/HadaraSection/HadaraSection")
);
const ExperienceSection = lazy(() =>
  import("../components/sections/ExperienceSection/ExperienceSection")
);
const IdentitySection = lazy(() =>
  import("../components/sections/IdentitySection/IdentitySection")
);
const DestinationsSection = lazy(() =>
  import("../components/sections/DestinationsSection/DestinationsSection")
);
const HeritageSection = lazy(() =>
  import("../components/sections/HeritageSection/HeritageSection")
);
const VisionSection = lazy(() =>
  import("../components/sections/VisionSection/VisionSection")
);
const MassageSection = lazy(() =>
  import("../components/sections/MassageSection/MassageSection")
);
const RoomSection = lazy(() =>
  import("../components/sections/RoomSection/RoomSection")
);
const FooterSection = lazy(() =>
  import("../components/sections/FooterSection/FooterSection")
);

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash || location.hash;
    const fromSearch = new URLSearchParams(window.location.search).get("section");
    const id = (hash ? hash.slice(1).split("?")[0] : null) || fromSearch;
    if (!id) return;

    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (scrollToSection()) return;
    const delays = [100, 400, 800, 1500, 2500, 4000];
    const timers = delays.map((d) => setTimeout(scrollToSection, d));
    return () => timers.forEach(clearTimeout);
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1).split("?")[0];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <>
      <EditableSection sectionId="hero">
        <HeroSection />
      </EditableSection>
      <Suspense
        fallback={
          <div className="h-[400px] bg-sand/30 animate-pulse" aria-hidden />
        }
      >
        <EditableSection sectionId="hadara">
          <HadaraSection />
        </EditableSection>
        <EditableSection sectionId="experience">
          <ExperienceSection />
        </EditableSection>
        <EditableSection sectionId="identity">
          <IdentitySection />
        </EditableSection>
        <EditableSection sectionId="destinations">
          <DestinationsSection />
        </EditableSection>
        <EditableSection sectionId="heritage">
          <HeritageSection />
        </EditableSection>
        <EditableSection sectionId="vision">
          <VisionSection />
        </EditableSection>
        <EditableSection sectionId="massage">
          <MassageSection />
        </EditableSection>
        <EditableSection sectionId="room">
          <RoomSection />
        </EditableSection>
        <EditableSection sectionId="footer">
          <FooterSection />
        </EditableSection>
      </Suspense>
    </>
  );
}

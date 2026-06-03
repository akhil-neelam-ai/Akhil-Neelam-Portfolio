import { lazy, Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { BioSection } from "@/components/bio-section";
import { BackToTop } from "@/components/back-to-top";

const WorkSection = lazy(() =>
  import("@/components/work-section").then((m) => ({ default: m.WorkSection }))
);
const ProjectsSection = lazy(() =>
  import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection }))
);
const ExperienceSection = lazy(() =>
  import("@/components/experience-section").then((m) => ({ default: m.ExperienceSection }))
);
const SpeakingSection = lazy(() =>
  import("@/components/speaking-section").then((m) => ({ default: m.SpeakingSection }))
);
const PersonalSection = lazy(() =>
  import("@/components/personal-section").then((m) => ({ default: m.PersonalSection }))
);
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((m) => ({ default: m.ContactSection }))
);

function SectionFallback() {
  return <div className="py-20 md:py-32" aria-hidden />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:ml-64">
        <div className="pt-16 lg:pt-0">
          <HeroSection />
          <BioSection />
          <Suspense fallback={<SectionFallback />}>
            <WorkSection />
            <ProjectsSection />
            <ExperienceSection />
            <SpeakingSection />
            <PersonalSection />
            <ContactSection />
          </Suspense>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}

import { useEffect, Suspense } from "react";
import { Navigation, navItems } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { BackToTop } from "@/components/back-to-top";
import { ErrorBoundary } from "@/lib/error-boundary";
import { lazySections } from "@/lib/section-loaders";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

const {
  work: WorkSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  speaking: SpeakingSection,
  personal: PersonalSection,
  contact: ContactSection,
} = lazySections;

function SectionFallback() {
  return (
    <div className="py-20 md:py-32 px-6" aria-busy="true" aria-live="polite">
      <div className="max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded-md bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="h-40 rounded-md bg-muted" />
      </div>
    </div>
  );
}

export default function Home() {
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    if (!navItems.some((item) => item.id === hash)) return;
    scrollToSection(hash, { track: false });
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:ml-64">
        <div className="pt-16 lg:pt-0">
          <HeroSection />
          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <WorkSection />
              <ProjectsSection />
              <ExperienceSection />
              <SpeakingSection />
              <PersonalSection />
              <ContactSection />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WorkSection } from "@/components/work-section";
import { SpeakingSection } from "@/components/speaking-section";
import { ExperienceSection } from "@/components/experience-section";
import { PersonalSection } from "@/components/personal-section";
import { VibeCodingSection } from "@/components/vibe-coding-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="lg:ml-64">
        <div className="pt-16 lg:pt-0">
          <HeroSection />
          <WorkSection />
          <VibeCodingSection />
          <ExperienceSection />
          <SpeakingSection />
          <PersonalSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

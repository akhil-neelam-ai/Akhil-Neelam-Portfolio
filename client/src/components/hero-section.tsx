import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/responsive-image";
import { ResumeButton } from "@/components/resume-button";
import { heroParagraphs, profile } from "@/data/bio";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

const HERO_WIDTHS = [384, 512, 768];
const HERO_DISPLAY_WIDTH = 384;
const HERO_DISPLAY_HEIGHT = 512;

export function HeroSection() {
  const scrollToSection = useScrollToSection();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-background dark:from-accent/15" />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-sans">
              {profile.eyebrow}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-serif mb-6 leading-snug">
              {profile.headline}
            </p>
            <div className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-sans space-y-4">
              {heroParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ResumeButton label="Download Resume" size="lg" testId="button-download-resume-hero" />
              <Button
                size="lg"
                variant="outline"
                className="border-secondary/80 text-foreground hover:bg-secondary/40"
                onClick={() => scrollToSection("work")}
                data-testid="button-view-work-hero"
              >
                View Work
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[3/4]">
              <div className="relative h-full w-full bg-card rounded-2xl overflow-hidden shadow-lg border border-card-border">
                <ResponsiveImage
                  basePath="/images/hero/hero"
                  widths={HERO_WIDTHS}
                  alt="Akhil Neelam - UC Berkeley Haas MBA Student, Founder, and Technology Leader"
                  className="w-full h-full object-cover object-top"
                  width={HERO_DISPLAY_WIDTH}
                  height={HERO_DISPLAY_HEIGHT}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 85vw, 384px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("work", { track: false })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors z-20"
        aria-label="Scroll to featured work"
        data-testid="button-scroll-down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}

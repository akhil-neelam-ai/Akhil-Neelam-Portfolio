import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroPhoto from "@assets/DSC06633_2_1768790401910.jpg";

export function HeroSection() {
  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background dark:from-accent/10" />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-sans">
              UC Berkeley MBA
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Scaling Impact through{" "}
              <span className="text-highlight">technology</span>
            </h1>
            <div className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-sans space-y-4">
              <p>
                I’m a full-time MBA student at UC Berkeley Haas School of Business. 
                Prior to business school, I co-founded South Asia’s only volunteer-led 
                think tank on gender & politics, growing 140+ members across 14 countries 
                and building a global network of change-makers.
              </p>
              <p>
                My journey, from building AI partnerships in government to leading product 
                customisation to building an impact startup has been about scaling impact 
                through technology.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[3/4]">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/40 to-secondary/40 rounded-3xl blur-2xl opacity-50" />
              <div className="relative h-full w-full bg-card rounded-2xl overflow-hidden shadow-lg border border-card-border group">
                <img
                  src={heroPhoto}
                  alt="Akhil Neelam"
                  className="w-full h-full object-cover object-top"
                  data-testid="img-hero-avatar"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors z-20"
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

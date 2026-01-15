import { motion } from "framer-motion";
import { ArrowDown, Download, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/Akhil-02_(1)_1768006871201.png";

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
              I scale impact through{" "}
              <span className="text-highlight">technology</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-sans">
              Hi, I'm <span className="text-foreground font-semibold">Akhil Neelam</span>. 
              Co-founder of South Asia's first think tank on gender & politics. 
              I'm pivoting into product management roles where I can translate 
              user insights into strategy and build human-centered products with measurable impact.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/api/resume" download="Akhil_Neelam_Resume.pdf" data-testid="button-download-resume-hero">
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
              <a
                href="https://linkedin.com/in/akhilneelam"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-hero"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/40 to-secondary/40 rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-2xl p-3 shadow-lg border border-card-border">
                <img
                  src={heroImage}
                  alt="Akhil Neelam"
                  className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-xl"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

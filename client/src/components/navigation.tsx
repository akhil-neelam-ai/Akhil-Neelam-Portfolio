import { useState, useEffect } from "react";
import { Menu, X, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "speaking", label: "Speaking" },
  { id: "experience", label: "Experience" },
  { id: "personal", label: "Personal" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="font-serif text-2xl font-bold text-sidebar-foreground">
            Akhil Neelam
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            MBA | Founder | Product
          </p>
        </div>

        <div className="flex-1 py-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  data-testid={`nav-${item.id}`}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 font-sans text-sm tracking-wide ${
                    activeSection === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-2 mb-4">
            <ThemeToggle />
            <a
              href="https://linkedin.com/in/akhilneelam"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin-sidebar"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:akhil_neelam@berkeley.edu" data-testid="link-email-sidebar">
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
          <a href="/api/resume" download="Akhil_Neelam_Resume.pdf" data-testid="button-download-resume-sidebar">
            <Button
              variant="secondary"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
        </div>
      </nav>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-serif text-xl font-bold text-sidebar-foreground">
            Akhil Neelam
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              className="text-sidebar-foreground"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[65px] z-40 bg-sidebar"
          >
            <div className="p-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      data-testid={`nav-mobile-${item.id}`}
                      className={`w-full text-left px-4 py-4 rounded-md transition-all duration-200 font-sans text-base ${
                        activeSection === item.id
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-sidebar-border">
                <div className="flex items-center gap-4 mb-4">
                  <a
                    href="https://linkedin.com/in/akhilneelam"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="mailto:akhil_neelam@berkeley.edu">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
                <a href="/api/resume" download="Akhil_Neelam_Resume.pdf">
                  <Button variant="secondary" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

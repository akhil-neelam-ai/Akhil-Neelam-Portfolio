import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeButton } from "@/components/resume-button";
import { SocialLinks } from "@/components/social-links";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "speaking", label: "Speaking" },
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = navItems.map((item) => item.id);

export function Navigation() {
  const activeSection = useActiveSection(sectionIds);
  const scrollToSection = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="text-left w-full"
          >
            <h1 className="font-serif text-2xl font-bold text-sidebar-foreground">
              Akhil Neelam
            </h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">
              MBA | Founder | Technology
            </p>
          </button>
        </div>

        <div className="flex-1 py-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
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
            <SocialLinks variant="sidebar" analyticsPrefix="sidebar" />
          </div>
          <ResumeButton fullWidth testId="button-download-resume-sidebar" />
        </div>
      </nav>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <button type="button" onClick={() => handleNav("home")} className="text-left">
            <h1 className="font-serif text-xl font-bold text-sidebar-foreground">
              Akhil Neelam
            </h1>
            <p className="text-xs text-sidebar-foreground/70">UC Berkeley Haas MBA</p>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              className="text-sidebar-foreground"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
                      onClick={() => handleNav(item.id)}
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
                  <SocialLinks variant="sidebar" analyticsPrefix="mobile" />
                </div>
                <ResumeButton fullWidth label="Download Resume" testId="button-download-resume-mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

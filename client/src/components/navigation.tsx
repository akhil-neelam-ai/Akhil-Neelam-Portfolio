import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeButton } from "@/components/resume-button";
import { SocialLinks } from "@/components/social-links";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { preloadSection } from "@/lib/section-loaders";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Featured Work" },
  { id: "projects", label: "Side Projects" },
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
  const [heroNameInView, setHeroNameInView] = useState(true);

  const handleNav = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    // Scroll on the next frame, once the open menu has released its scroll lock.
    requestAnimationFrame(() => scrollToSection(sectionId));
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    // The menu is hidden from lg up, so close it if the window widens past that.
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onDesktopChange = () => {
      if (desktopQuery.matches) setIsMobileMenuOpen(false);
    };
    // Keep the page behind the menu from scrolling or taking keyboard focus.
    const main = document.querySelector("main");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onDesktopChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onDesktopChange);
    };
  }, [isMobileMenuOpen]);

  // The hero opens with the name and degree in large type, so the mobile header
  // only repeats them once that has scrolled up under the header.
  useEffect(() => {
    const heroName = document.querySelector("#home h1");
    if (!heroName) {
      setHeroNameInView(false);
      return;
    }
    const headerHeight = document.getElementById("mobile-header")?.offsetHeight ?? 0;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroNameInView(entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );
    observer.observe(heroName);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="text-left w-full"
          >
            <p className="font-serif text-2xl font-bold text-sidebar-foreground">
              Akhil Neelam
            </p>
            <p className="text-sm text-sidebar-foreground/70 mt-1">
              MBA | Founder | Technology
            </p>
          </button>
        </div>

        {/* On short windows the links tighten up, then scroll, so the Resume footer stays visible. */}
        <div className="flex-1 min-h-0 overflow-y-auto py-8 px-4 [@media(max-height:700px)]:py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  onMouseEnter={() => preloadSection(item.id)}
                  onFocus={() => preloadSection(item.id)}
                  data-testid={`nav-${item.id}`}
                  className={`w-full text-left px-4 py-3 [@media(max-height:700px)]:py-2 rounded-md transition-all duration-200 font-sans text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar ${
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

      <div
        id="mobile-header"
        className="lg:hidden fixed top-0 left-0 right-0 z-50 h-mobile-header bg-sidebar border-b border-sidebar-border"
      >
        <div className="flex h-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => handleNav("home")}
            data-testid="button-header-home"
            className={`text-left transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
              heroNameInView && !isMobileMenuOpen ? "invisible opacity-0" : "opacity-100"
            }`}
          >
            <p className="font-serif text-xl font-bold text-sidebar-foreground">
              Akhil Neelam
            </p>
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
            className="lg:hidden fixed inset-0 top-mobile-header z-40 bg-sidebar overflow-y-auto overscroll-contain"
          >
            <div className="p-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNav(item.id)}
                      onMouseEnter={() => preloadSection(item.id)}
                      onFocus={() => preloadSection(item.id)}
                      data-testid={`nav-mobile-${item.id}`}
                      className={`w-full text-left px-4 py-4 rounded-md transition-all duration-200 font-sans text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar ${
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

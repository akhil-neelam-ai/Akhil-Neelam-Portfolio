import { useCallback } from "react";
import { analytics } from "@/lib/analytics";

const MOBILE_HEADER_OFFSET = 65;

export function useScrollToSection() {
  return useCallback((sectionId: string, options?: { track?: boolean }) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset =
      window.innerWidth < 1024 && sectionId !== "home" ? MOBILE_HEADER_OFFSET : 0;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });

    if (options?.track !== false) {
      analytics.navigateToSection(sectionId);
    }
  }, []);
}

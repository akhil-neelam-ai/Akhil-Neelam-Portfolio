import { useCallback } from "react";
import { analytics } from "@/lib/analytics";
import { getScrollBehavior } from "@/lib/motion";

const MOBILE_HEADER_OFFSET = 65;
const SCROLL_WAIT_TIMEOUT_MS = 5000;

export function useScrollToSection() {
  return useCallback((sectionId: string, options?: { track?: boolean }) => {
    const performScroll = (element: HTMLElement) => {
      const offset =
        window.innerWidth < 1024 && sectionId !== "home" ? MOBILE_HEADER_OFFSET : 0;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: getScrollBehavior() });

      const currentHash = window.location.hash.slice(1);
      if (currentHash !== sectionId) {
        window.history.replaceState(null, "", `#${sectionId}`);
      }

      if (options?.track !== false) {
        analytics.navigateToSection(sectionId);
      }
    };

    const element = document.getElementById(sectionId);
    if (element) {
      performScroll(element);
      return;
    }

    // Section may be lazy-loaded and not yet mounted — wait briefly for it.
    let timeoutId: number | undefined;
    const observer = new MutationObserver(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        observer.disconnect();
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
        performScroll(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    timeoutId = window.setTimeout(() => {
      observer.disconnect();
    }, SCROLL_WAIT_TIMEOUT_MS);
  }, []);
}

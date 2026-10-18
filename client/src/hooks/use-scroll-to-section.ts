import { useCallback } from "react";
import { analytics } from "@/lib/analytics";
import { getScrollBehavior } from "@/lib/motion";

const SCROLL_WAIT_TIMEOUT_MS = 5000;

export function useScrollToSection() {
  return useCallback((sectionId: string, options?: { track?: boolean }) => {
    const performScroll = (element: HTMLElement) => {
      // The fixed mobile header is display:none from lg up, so it measures 0 there.
      const header = document.getElementById("mobile-header");
      const offset = header ? header.offsetHeight : 0;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: getScrollBehavior() });

      const currentHash = window.location.hash.slice(1);
      if (currentHash !== sectionId) {
        window.history.pushState(null, "", `#${sectionId}`);
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

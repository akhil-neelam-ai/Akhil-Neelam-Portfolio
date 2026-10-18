import { useEffect, useState } from "react";

// A section becomes active once its top scrolls above this fraction of the viewport.
const ACTIVE_LINE_RATIO = 0.5;

function readInitialFromHash(sectionIds: readonly string[]): string {
  if (typeof window === "undefined") return sectionIds[0] ?? "home";
  const hash = window.location.hash.slice(1);
  return sectionIds.includes(hash) ? hash : sectionIds[0] ?? "home";
}

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState<string>(() =>
    readInitialFromHash(sectionIds),
  );
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (ids.length === 0) return;

    // Sections stack with no gaps, so the last one whose top is above the line is
    // the one filling the middle of the screen. At the very bottom of the page the
    // last section wins, even when it is too short to reach the line.
    const update = () => {
      const line = window.innerHeight * ACTIVE_LINE_RATIO;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

      let topId = "";
      for (const id of ids) {
        // Lazy-loaded sections are skipped until they mount.
        const el = document.getElementById(id);
        if (el && (atBottom || el.getBoundingClientRect().top <= line)) topId = id;
      }

      if (topId) {
        setActiveSection(topId);
        const currentHash = window.location.hash.slice(1);
        if (currentHash !== topId) {
          window.history.replaceState(null, "", `#${topId}`);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [idsKey]);

  return activeSection;
}

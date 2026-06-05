import { useEffect, useRef, useState } from "react";

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
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (ids.length === 0) return;

    const ratios = ratiosRef.current;
    for (const id of ids) {
      if (!ratios.has(id)) ratios.set(id, 0);
    }
    for (const key of Array.from(ratios.keys())) {
      if (!ids.includes(key)) ratios.delete(key);
    }

    const observed = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let topId = "";
        let topRatio = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }

        if (topId) {
          setActiveSection(topId);
          const currentHash = window.location.hash.slice(1);
          if (currentHash !== topId) {
            window.history.replaceState(null, "", `#${topId}`);
          }
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const tryObserve = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      }
    };

    tryObserve();

    // Sections may be lazy-loaded (React.lazy + Suspense), so observe DOM
    // mutations until every target id has been attached to the IntersectionObserver.
    let mutationObserver: MutationObserver | null = null;
    if (observed.size < ids.length) {
      mutationObserver = new MutationObserver(() => {
        tryObserve();
        if (observed.size === ids.length) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, [idsKey]);

  return activeSection;
}

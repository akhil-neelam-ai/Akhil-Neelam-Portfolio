import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "home");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>(ids.map((id) => [id, 0]));

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
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeSection;
}

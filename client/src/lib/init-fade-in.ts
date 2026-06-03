export function initFadeInObserver() {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  const observeNew = (root: ParentNode) => {
    root.querySelectorAll(".fade-in-view:not(.is-visible)").forEach((el) => {
      observer.observe(el);
    });
  };

  observeNew(document);

  const mutationObserver = new MutationObserver(() => {
    observeNew(document);
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

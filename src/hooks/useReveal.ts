import { useEffect } from "react";

/**
 * Adds the `in` class to every `.reveal` element once it scrolls into view,
 * driving the fade-up animation defined in index.css. Runs on mount.
 */
export function useReveal() {
  useEffect(() => {
    // `data-reveal-defer` elements manage their own `in` timing (e.g. the
    // Angebot price card, which waits for the 3-step sequence to finish).
    const els = document.querySelectorAll(".reveal:not([data-reveal-defer])");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

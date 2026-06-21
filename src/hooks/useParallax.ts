import { useEffect, type RefObject } from "react";

/**
 * Applies a vertical parallax transform to every `[data-px]` descendant of
 * `ref`, proportional to the element's distance from the viewport center.
 * No-ops when the user prefers reduced motion. Returns nothing — it mutates
 * the DOM nodes' transforms directly via rAF for smoothness.
 */
export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...sec.querySelectorAll<HTMLElement>("[data-px]")];
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      layers.forEach((el) => {
        const sp = parseFloat(el.getAttribute("data-px") ?? "0") || 0;
        el.style.transform = `translate3d(0, ${(center * sp).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

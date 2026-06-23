import { useEffect, type RefObject } from "react";

/**
 * Applies scroll-driven parallax values to descendants of `ref`.
 * `[data-px]` receives a vertical transform; `[data-px-rotate]` receives a
 * `--px-rotate` CSS variable that can be composed with local transforms.
 * No-ops when the user prefers reduced motion. Returns nothing — it mutates
 * the DOM nodes' transforms directly via rAF for smoothness.
 */
export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...sec.querySelectorAll<HTMLElement>("[data-px]")];
    const rotators = [...sec.querySelectorAll<HTMLElement>("[data-px-rotate]")];
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      layers.forEach((el) => {
        const sp = parseFloat(el.getAttribute("data-px") ?? "0") || 0;
        el.style.transform = `translate3d(0, ${(center * sp).toFixed(1)}px, 0)`;
      });
      rotators.forEach((el) => {
        const sp = parseFloat(el.getAttribute("data-px-rotate") ?? "0") || 0;
        const max = parseFloat(el.getAttribute("data-px-rotate-max") ?? "6") || 6;
        const deg = Math.max(-max, Math.min(max, center * sp));
        el.style.setProperty("--px-rotate", `${deg.toFixed(2)}deg`);
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

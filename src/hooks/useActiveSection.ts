import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently nearest the viewport's
 * vertical centre, so the header nav can highlight the active link. Observes a
 * narrow band around mid-screen — whichever passed `id` crosses it wins, picking
 * the topmost on ties to avoid flicker. Returns null while above the first section.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // active = first visible section in document order
        const current = sections.find((s) => visible.has(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
    // key string keeps the effect stable across re-renders with the same ids
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

import { useEffect, useState } from "react";

/**
 * Subtle scroll affordance shown at the start: a thin vertical track with a
 * small terracotta dot drifting downward. Fades out as soon as the user
 * scrolls past the first stretch of the hero.
 */
export function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-hint" data-hidden={hidden} aria-hidden="true">
      <span className="scroll-hint__track">
        <span className="scroll-hint__dot" />
      </span>
    </div>
  );
}

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Vertical position (0–1) → short label for the device's "you are here" pill. */
interface Stop {
  at: number;
  label: string;
}

const FRAME_H = "min(620px, 70vh)";

/**
 * Pinned "scroll-through": the page content plays inside a fixed browser frame
 * as the user scrolls past a tall wrapper. A scrubber + a label track progress.
 * Different effect from the chapter-pinning StickyCase used in case 1.
 *
 * Falls back to a plain, statically-scrollable frame when the user prefers
 * reduced motion.
 */
export function ScrollThrough({
  url,
  children,
  stops = [],
  travel = 2.4,
}: {
  url: string;
  children: ReactNode;
  stops?: Stop[];
  travel?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const body = bodyRef.current;
    if (!wrap || !inner || !body) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const total = wrap.offsetHeight - window.innerHeight;
      const passed = Math.min(
        Math.max(-wrap.getBoundingClientRect().top, 0),
        Math.max(total, 1),
      );
      const p = total > 0 ? passed / total : 0;
      setProgress(p);
      const maxShift = Math.max(0, inner.scrollHeight - body.clientHeight);
      setY(-p * maxShift);
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
  }, []);

  const chromeBar = (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 13px",
        background: "#efe9df",
        borderBottom: "1px solid #e6dccb",
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        {["#e0685a", "#e8b94c", "#5db469"].map((c, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: 99, background: c }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: 360,
          margin: "0 auto",
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: "#9a8f7e",
          background: "#fffdf9",
          borderRadius: 7,
          padding: "4px 12px",
          textAlign: "center",
          border: "1px solid #ece5d8",
        }}
      >
        {url}
      </div>
      <div style={{ width: 52 }} />
    </div>
  );

  const card = (fixed: boolean): ReactNode => (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--line)",
        boxShadow:
          "0 40px 90px -40px rgba(60,40,25,.5), 0 6px 16px -10px rgba(60,40,25,.25)",
        background: "#fff",
      }}
    >
      {chromeBar}
      {/* scrubber */}
      {fixed && (
        <div style={{ height: 3, background: "var(--line)" }}>
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "var(--accent)",
              transition: "width .08s linear",
            }}
          />
        </div>
      )}
      <div
        ref={fixed ? bodyRef : undefined}
        style={
          fixed
            ? { position: "relative", height: FRAME_H, overflow: "hidden" }
            : undefined
        }
      >
        {fixed && stops.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 5,
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".06em",
              color: "#fff",
              background: "color-mix(in oklab,var(--ink) 78%,transparent)",
              backdropFilter: "blur(3px)",
              borderRadius: 999,
              padding: "5px 11px",
            }}
          >
            {stops.reduce((cur, s) => (progress >= s.at ? s.label : cur), stops[0].label)}
          </div>
        )}
        <div
          ref={fixed ? innerRef : undefined}
          style={fixed ? { transform: `translateY(${y}px)`, willChange: "transform" } : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (reduced) return <>{card(false)}</>;

  return (
    <div ref={wrapRef} style={{ height: `${travel * 100}vh` }}>
      <div
        style={{
          position: "sticky",
          top: "clamp(80px, 9vh, 130px)",
        }}
      >
        {card(true)}
      </div>
    </div>
  );
}

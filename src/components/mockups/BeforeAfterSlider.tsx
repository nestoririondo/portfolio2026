import { useCallback, useEffect, useRef, useState } from "react";
import { MiniSite } from "./MiniSite";

/**
 * Draggable before/after reveal of a small-business site redesign.
 * Currently not mounted on the page, but kept as a ready-to-use showcase piece.
 */
export function BeforeAfterSlider({ ratio = "16 / 10" }: { ratio?: string }) {
  const [pct, setPct] = useState(50);
  const [drag, setDrag] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(2, Math.min(98, p));
    setPct(p);
  }, []);

  useEffect(() => {
    if (!drag) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromX(x);
    };
    const up = () => setDrag(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [drag, setFromX]);

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    setDrag(true);
    const x =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setFromX(x);
  };

  const tag = (text: string, kind: "before" | "after") => (
    <span
      style={{
        position: "absolute",
        top: 12,
        [kind === "before" ? "left" : "right"]: 12,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        padding: "5px 11px",
        borderRadius: 999,
        zIndex: 4,
        background: kind === "before" ? "rgba(40,38,34,.72)" : "var(--accent)",
        color: "#fff",
        backdropFilter: "blur(2px)",
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );

  return (
    <div
      ref={wrap}
      onMouseDown={start}
      onTouchStart={start}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: 20,
        overflow: "hidden",
        userSelect: "none",
        cursor: drag ? "grabbing" : "ew-resize",
        boxShadow:
          "0 30px 70px -28px rgba(60,40,25,.42), 0 2px 0 rgba(255,255,255,.5) inset",
        border: "1px solid var(--line)",
        touchAction: "pan-y",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <MiniSite kind="after" />
      </div>
      {tag("Nachher", "after")}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: pct + "%",
          overflow: "hidden",
          borderRight: "0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: wrap.current
              ? wrap.current.getBoundingClientRect().width
              : "100%",
            height: "100%",
          }}
        >
          <MiniSite kind="before" />
        </div>
        {tag("Vorher", "before")}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: pct + "%",
          transform: "translateX(-50%)",
          width: 2,
          background: "var(--paper)",
          zIndex: 5,
          boxShadow: "0 0 0 1px rgba(60,40,25,.12)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "var(--paper)",
            display: "grid",
            placeItems: "center",
            color: "var(--accent)",
            boxShadow: "0 8px 22px -6px rgba(60,40,25,.5)",
            border: "1px solid var(--line)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 7 4 12 9 17" />
            <polyline points="15 7 20 12 15 17" />
          </svg>
        </div>
      </div>
    </div>
  );
}

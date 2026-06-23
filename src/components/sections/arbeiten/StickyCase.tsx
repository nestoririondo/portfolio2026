import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { REB_CHAPTERS } from "../../../data/content";
import { Icon } from "../../ui/Icon";
import { MiniSite } from "../../mockups/MiniSite";
import { PhoneFrame } from "../../mockups/Frames";
import { RebDesktop, RebMobile } from "../../mockups/RebSite";
import { CaseLabel } from "./CaseParts";

/**
 * Scroll-through case study (REB). Narrative and visual pin together while the
 * user scrolls a tall wrapper:
 *   - the active chapter is driven by scroll *progress* (monotonic → no flicker),
 *   - step 02 owns the long middle and the live desktop browser scrolls through
 *     its full page while staying in view,
 *   - step 03 cross-fades to the mobile view, celebrated with parallax confetti.
 *
 * On narrow screens the steps collapse to a compact header that swaps as you
 * scroll, with the visual stacked below.
 */

const TRAVEL = 3.2; // wrapper height in viewport heights
const FRAME_H = "min(600px, 68vh)";
// segment boundaries on 0..1 scroll progress: 01 short, 02 long, 03 short
const SEG = [0.16, 0.78];
const MOBILE_Q = "(max-width: 920px)";
// mobile pin offset — small now that the nav auto-hides on scroll-down, so the
// content sits high and the visual gets the reclaimed height
const M_TOP = "20px";

/** Parallax celebration shapes behind the phone, layered by depth. */
const DECOS: {
  x: string;
  y: string;
  kind: "ring" | "dot" | "spark" | "star";
  size: number;
  depth: number;
  color: string;
}[] = [
  { x: "12%", y: "16%", kind: "ring", size: 44, depth: 0.9, color: "var(--accent)" },
  { x: "84%", y: "18%", kind: "spark", size: 30, depth: 1.2, color: "var(--accent)" },
  { x: "80%", y: "62%", kind: "dot", size: 14, depth: 0.5, color: "#e8b94c" },
  { x: "13%", y: "58%", kind: "star", size: 26, depth: 0.75, color: "#e8b94c" },
  { x: "90%", y: "40%", kind: "dot", size: 9, depth: 0.35, color: "var(--accent)" },
  { x: "6%", y: "34%", kind: "dot", size: 12, depth: 0.4, color: "#5db469" },
  { x: "72%", y: "84%", kind: "ring", size: 20, depth: 0.6, color: "var(--accent)" },
  { x: "22%", y: "84%", kind: "spark", size: 20, depth: 0.5, color: "var(--accent)" },
];

function decoShape(kind: string, size: number, color: string): ReactNode {
  if (kind === "spark") return <Icon name="spark" size={size} />;
  if (kind === "star") return <Icon name="star" size={size} />;
  if (kind === "ring")
    return (
      <span
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `3px solid ${color}`,
        }}
      />
    );
  return (
    <span
      style={{ display: "block", width: size, height: size, borderRadius: "50%", background: color }}
    />
  );
}

/** p = local progress through step 03 (0..1); 0 also used as a static rest. */
function Celebration({ p }: { p: number }) {
  // ramp in quickly so the sprites clearly appear as soon as step 03 begins
  const enter = Math.min(1, p / 0.12);
  const blob = (
    x: string,
    y: string,
    s: number,
    c: string,
    depth: number,
  ): CSSProperties => ({
    position: "absolute",
    left: x,
    top: y,
    width: s,
    height: s,
    borderRadius: "50%",
    background: c,
    filter: "blur(46px)",
    opacity: enter * 0.16,
    transform: `translate(-50%,-50%) translateY(${-p * 34 * depth}px)`,
  });
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <span style={blob("30%", "32%", 190, "var(--accent)", 0.4)} />
      <span style={blob("74%", "66%", 160, "#e8b94c", 0.6)} />
      {DECOS.map((d, i) => {
        const y = (1 - enter) * 26 - p * 62 * d.depth;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              color: d.color,
              opacity: enter,
              transform: `translate(-50%,-50%) translateY(${y}px) scale(${0.3 + enter * 0.7})`,
            }}
          >
            {decoShape(d.kind, d.size, d.color)}
          </span>
        );
      })}
    </div>
  );
}

export function StickyCase() {
  const [active, setActive] = useState(0);
  const [y, setY] = useState(0); // desktop inner scroll
  const [sub, setSub] = useState(0); // progress inside step 02
  const [tail, setTail] = useState(0); // progress inside step 03 (celebration)
  const [headFade, setHeadFade] = useState(1); // mobile header: dips to 0 at boundaries
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.(MOBILE_Q).matches,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia?.(MOBILE_Q);
    const onMq = () => setMobile(!!mq?.matches);
    mq?.addEventListener?.("change", onMq);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return () => mq?.removeEventListener?.("change", onMq);
    }
    const wrap = wrapRef.current;
    if (!wrap) return () => mq?.removeEventListener?.("change", onMq);

    let raf = 0;
    const update = () => {
      raf = 0;
      const total = wrap.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-wrap.getBoundingClientRect().top, 0), Math.max(total, 1));
      const p = total > 0 ? passed / total : 0;

      let idx = 0;
      let s = 0;
      let t = 0;
      if (p >= SEG[1]) {
        idx = 2;
        t = (p - SEG[1]) / (1 - SEG[1]);
      } else if (p >= SEG[0]) {
        idx = 1;
        s = (p - SEG[0]) / (SEG[1] - SEG[0]);
      }
      setActive(idx);
      setSub(s);
      setTail(t);
      // fade the compact header to 0 right at a step boundary, so the swapped
      // text fades out then back in instead of hard-cutting
      const band = 0.045;
      const dist = Math.min(Math.abs(p - SEG[0]), Math.abs(p - SEG[1]));
      setHeadFade(Math.min(1, dist / band));

      const inner = innerRef.current;
      const body = bodyRef.current;
      if (inner && body) {
        const maxShift = Math.max(0, inner.scrollHeight - body.clientHeight);
        setY(-s * maxShift);
      }
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
      mq?.removeEventListener?.("change", onMq);
      cancelAnimationFrame(raf);
    };
  }, []);

  // --- shared bits -----------------------------------------------------------

  const step = (c: (typeof REB_CHAPTERS)[number], on: boolean, compact = false) => (
    <>
      <span className="case-step__num">{c.k}</span>
      <div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: on ? "var(--accent)" : "var(--muted)",
            transition: "color .3s",
          }}
        >
          {c.label}
        </span>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 500,
            fontSize: compact ? 18 : 21,
            margin: "3px 0 5px",
          }}
        >
          {c.title}
        </div>
        <p
          style={{
            fontSize: compact ? 14 : 14.5,
            color: "var(--muted)",
            lineHeight: compact ? 1.45 : 1.5,
          }}
        >
          {c.body}
        </p>
      </div>
    </>
  );

  const liveBtn = (
    <a
      href="https://realestateinberlin.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: "0 0 auto",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--mono)",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--accent)",
        background: "var(--accent-soft)",
        border: "1px solid color-mix(in oklab,var(--accent) 22%,var(--line))",
        borderRadius: 999,
        padding: "5px 11px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      Live ansehen ↗
    </a>
  );

  const intro = (
    <>
      <h3 style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 6 }}>REB Consulting GmbH</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: mobile ? 16 : 22,
        }}
      >
        <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
          Immobilien · realestateinberlin.com
        </span>
        {liveBtn}
      </div>
    </>
  );

  const narrative = (
    <div className="case-left">
      {intro}
      <p style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.55, marginBottom: 26 }}>
        Statt die Immobilien nur über teure Portale zu zeigen, präsentiert REB
        sie jetzt auf der eigenen Website — live aus der Maklersoftware.
      </p>
      <div className="case-steps">
        {REB_CHAPTERS.map((c, i) => (
          <div
            key={i}
            className={"case-step" + (active === i ? " is-active" : "")}
            aria-current={active === i ? "step" : undefined}
          >
            {step(c, active === i)}
          </div>
        ))}
      </div>
    </div>
  );

  // compact header for narrow screens — one step, swaps as you scroll
  const mobileHead = (
    <div style={{ flex: "0 0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>
          REB Consulting · Immobilien
        </span>
        {liveBtn}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {REB_CHAPTERS.map((_, i) => (
          <span
            key={i}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 99,
              background: i <= active ? "var(--accent)" : "var(--line)",
              transition: "background .4s ease",
            }}
          />
        ))}
      </div>
      <div
        className="case-step is-active"
        style={{ padding: "12px 14px", minHeight: 122, alignItems: "flex-start" }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
            opacity: headFade,
            transition: "opacity .1s linear",
          }}
        >
          {step(REB_CHAPTERS[active], true, true)}
        </div>
      </div>
    </div>
  );

  const stage = (frameH: string): ReactNode => {
    const layer = (show: boolean): CSSProperties => ({
      position: "absolute",
      inset: 0,
      opacity: show ? 1 : 0,
      transform: show ? "none" : "scale(.985)",
      transition: "opacity .55s ease, transform .55s ease",
      pointerEvents: show ? "auto" : "none",
    });
    return (
      <div style={{ position: "relative", height: frameH }}>
        {/* 01 — Vorher (MiniSite brings its own dated browser chrome) */}
        <div style={layer(active === 0)}>
          <div style={{ ...cardStyle, height: "100%", overflow: "hidden" }}>
            <MiniSite kind="before" />
          </div>
        </div>

        {/* 02 — Jetzt, live über Propstack (scrolls through the full page) */}
        <div style={layer(active === 1)}>
          <div style={{ ...cardStyle, height: "100%", display: "flex", flexDirection: "column" }}>
            {chromeBar("realestateinberlin.com")}
            <div style={{ height: 3, background: "var(--line)", flex: "0 0 auto" }}>
              <div
                style={{
                  height: "100%",
                  width: `${sub * 100}%`,
                  background: "var(--accent)",
                  transition: "width .08s linear",
                }}
              />
            </div>
            <div ref={bodyRef} style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              <div ref={innerRef} style={{ transform: `translateY(${y}px)`, willChange: "transform" }}>
                <RebDesktop />
              </div>
            </div>
          </div>
        </div>

        {/* 03 — Mobil, with parallax celebration.
            No overflow:hidden here — Celebration clips its own decorations, and
            clipping would chop the phone's drop shadow. */}
        <div style={{ ...layer(active === 2), display: "grid", placeItems: "center" }}>
          <Celebration p={tail} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <PhoneFrame width={mobile ? 216 : 252}>
              <RebMobile />
            </PhoneFrame>
          </div>
        </div>
      </div>
    );
  };

  const label = (
    <CaseLabel n="Fallstudie 01">
      <span
        className="chip"
        style={{
          background: "var(--accent-soft)",
          borderColor: "color-mix(in oklab,var(--accent) 22%,var(--line))",
          color: "var(--accent)",
          fontWeight: 600,
        }}
      >
        <Icon name="star" size={14} /> Echter Kunde
      </span>
    </CaseLabel>
  );

  // --- reduced motion fallback: static stacked shots -------------------------
  if (reduced) {
    return (
      <div className="reveal" style={{ marginBottom: "clamp(64px,9vw,120px)" }}>
        {label}
        <div style={{ display: "grid", gap: 32 }}>
          {narrative}
          <div style={cardStyle}>
            {chromeBar("realestateinberlin.com")}
            <RebDesktop />
          </div>
          <div style={{ position: "relative", display: "grid", placeItems: "center", padding: "32px 0" }}>
            <Celebration p={0.4} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <PhoneFrame width={208}>
                <RebMobile />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- pinned scrollytelling -------------------------------------------------
  return (
    <div className="reveal" style={{ marginBottom: "clamp(64px,9vw,120px)" }}>
      {label}
      <div ref={wrapRef} style={{ height: `${TRAVEL * 100}vh`, position: "relative" }}>
        {mobile ? (
          <div className="case-pin" style={{ position: "sticky", top: M_TOP }}>
            {mobileHead}
            <div style={{ marginTop: 14 }}>
              {stage(`calc(100dvh - ${M_TOP} - 210px)`)}
            </div>
          </div>
        ) : (
          <div
            className="case-pin"
            style={{
              position: "sticky",
              top: "clamp(88px, 10vh, 128px)",
              display: "grid",
              gridTemplateColumns: "minmax(280px,.9fr) minmax(0,1.1fr)",
              gap: "clamp(28px,5vw,68px)",
              alignItems: "center",
            }}
          >
            {narrative}
            {stage(FRAME_H)}
          </div>
        )}
      </div>
    </div>
  );
}

const chromeBar = (url: string): ReactNode => (
  <div
    style={{
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

const cardStyle: CSSProperties = {
  width: "100%",
  borderRadius: 14,
  overflow: "hidden",
  border: "1px solid var(--line)",
  boxShadow: "0 40px 90px -40px rgba(60,40,25,.5), 0 6px 16px -10px rgba(60,40,25,.25)",
  background: "#fff",
};

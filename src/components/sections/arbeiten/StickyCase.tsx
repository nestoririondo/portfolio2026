import { memo, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { REB_CHAPTERS } from "../../../data/content";
import { MiniSite } from "../../mockups/MiniSite";
import { PhoneFrame } from "../../mockups/Frames";
import { RebInteraction, RebMobile, RebShot } from "../../mockups/RebSite";

/**
 * Scroll-through case study (REB). Narrative and visual pin together while the
 * user scrolls a tall wrapper:
 *   - the active chapter is driven by scroll *progress* (monotonic → no flicker),
 *   - step 02 owns the long middle and the click-through plays through as the
 *     long screenshot scrolls while staying in view,
 *   - step 03 cross-fades to the mobile view over a soft ambient backdrop.
 *
 * On narrow screens the steps collapse to a compact header that swaps as you
 * scroll, with the visual stacked below.
 *
 * Performance: the scroll handler runs every frame, but it must NOT re-render
 * this whole component each time — reconciling MiniSite, the narrative and the
 * phone 60×/s is what made the click-through choppy on mobile. So the only
 * thing that updates per frame is the small `<ClickThrough>` child (via a
 * registered setter) plus an imperative opacity write on the mobile header.
 * Everything else here is driven by *discrete* state (active chapter, the
 * desktop→phone hand-off, the inbox banner) that changes only a handful of
 * times across the entire scroll.
 */

const TRAVEL = 28; // wrapper height in viewport heights
const FRAME_H = "min(600px, 68vh)";
// segment boundaries on 0..1 scroll progress: 01 short, 02 long, 03 short.
// 03 is kept tight so there's only a brief rest after the inbox banner drops.
const SEG = [0.08, 0.86];
const HANDOFF = 0.35; // within step 03: desktop view rests, then the phone rises
const NOTIFY_AT = 0.4; // within step 03: the inbox banner drops, just after the phone lands
// scroll progress at which the phone actually rises in. Until here the "Anfrage
// gesendet" confirmation still rests on the desktop view — the climax of step 02
// — so the stepper/progress must keep reading 02, not jump to 03.
const PHONE_AT = SEG[1] + HANDOFF * (1 - SEG[1]);
const MOBILE_Q = "(max-width: 920px)";
// mobile pin offset — small now that the nav auto-hides on scroll-down, so the
// content sits high and the visual gets the reclaimed height
const M_TOP = "20px";

function MobileAmbientBackdrop() {
  const blob = (
    left: string,
    top: string,
    size: string,
    color: string,
    opacity: number,
  ): CSSProperties => ({
    position: "absolute",
    left,
    top,
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    filter: "blur(58px)",
    opacity,
    transform: "translate(-50%, -50%)",
  });

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: "-30%",
        pointerEvents: "none",
      }}
    >
      <span style={blob("28%", "28%", "42%", "#bf7050", 0.2)} />
      <span style={blob("72%", "62%", "38%", "#3b6ea0", 0.16)} />
      <span style={blob("56%", "78%", "32%", "#bd8a2c", 0.16)} />
      <span
        style={{
          position: "absolute",
          inset: "10%",
          opacity: 0.24,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,.7) 42%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,.7) 42%, transparent 72%)",
        }}
      />
    </div>
  );
}

/**
 * The step-02 visual. Owns the continuous scroll progress in its own state and
 * exposes a setter through `register`, so per-frame updates re-render only this
 * small subtree (chrome bar + progress bar + the click-through) — never the
 * parent. Memoised so the parent's discrete re-renders don't reset it.
 */
const ClickThrough = memo(function ClickThrough({
  register,
}: {
  register: (set: (p: number) => void) => void;
}) {
  const [p, setP] = useState(0);
  useEffect(() => register(setP), [register]);
  return (
    <div style={{ ...cardStyle, width: "100%" }}>
      {chromeBar("realestateinberlin.nestoririondo.com")}
      <RebInteraction progress={p} />
    </div>
  );
});

export function StickyCase() {
  const [active, setActive] = useState(0);
  const [showPhone, setShowPhone] = useState(false); // step 03: phone has risen in
  const [notify, setNotify] = useState(false); // step 03: inbox banner visible
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.(MOBILE_Q).matches,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const mHeadRef = useRef<HTMLDivElement>(null); // mobile header: opacity driven imperatively
  const barRef = useRef<HTMLDivElement>(null); // steps-banner progress fill: width driven imperatively
  const setProgressRef = useRef<((p: number) => void) | null>(null);
  // mirror the discrete state in refs so the scroll handler can setState only on
  // an actual transition instead of every frame
  const lastIdxRef = useRef(0);
  const showPhoneRef = useRef(false);
  const notifyRef = useRef(false);

  const register = useCallback((set: (p: number) => void) => {
    setProgressRef.current = set;
  }, []);

  // Warm the case-study screenshots during browser idle time so they are
  // decoded and cached before the user scrolls into this (below-the-fold)
  // section — no visible wait once the scrollytelling starts.
  useEffect(() => {
    const srcs = [
      "/img/reb/1.webp",
      "/img/reb/2.webp",
      "/img/reb/3.webp",
      "/img/reb/smart.webp",
    ];
    const warm = () => srcs.forEach((s) => {
      const img = new Image();
      img.decoding = "async";
      img.src = s;
    });
    const hasRic = typeof window.requestIdleCallback === "function";
    const id = hasRic
      ? window.requestIdleCallback(warm, { timeout: 2500 })
      : window.setTimeout(warm, 1200);
    return () => (hasRic ? window.cancelIdleCallback?.(id as number) : clearTimeout(id as number));
  }, []);

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
      if (p >= SEG[1]) {
        idx = 2;
        s = (p - SEG[1]) / (1 - SEG[1]);
      } else if (p >= SEG[0]) {
        idx = 1;
        s = (p - SEG[0]) / (SEG[1] - SEG[0]);
      }

      // The narrative/progress phases track what's on screen, not the raw scroll
      // segments: step 02 owns everything up to the phone hand-off (incl. the
      // confirmation resting on the desktop view); step 03 begins as it rises.
      const phase = p >= PHONE_AT ? 2 : p >= SEG[0] ? 1 : 0;

      // --- continuous (per-frame) — isolated to the small subtrees ----------
      // click-through progress; once on step 03 it rests at its final state
      setProgressRef.current?.(idx === 2 ? 1 : s);
      // steps-banner progress: each chapter owns a third of the bar, the
      // within-chapter position fills it smoothly → shows exactly where you are
      if (barRef.current) {
        let local = 0;
        if (phase === 2) local = (p - PHONE_AT) / (1 - PHONE_AT);
        else if (phase === 1) local = (p - SEG[0]) / (PHONE_AT - SEG[0]);
        else local = SEG[0] > 0 ? p / SEG[0] : 0;
        const overall = (phase + Math.min(Math.max(local, 0), 1)) / REB_CHAPTERS.length;
        barRef.current.style.width = `${overall * 100}%`;
      }
      // mobile header fade: dip to 0 right at a phase boundary so the swapped
      // text fades out then back in instead of hard-cutting
      if (mHeadRef.current) {
        const band = 0.045;
        const dist = Math.min(Math.abs(p - SEG[0]), Math.abs(p - PHONE_AT));
        mHeadRef.current.style.opacity = String(Math.min(1, dist / band));
      }

      // --- discrete — commit to React state only when it actually changes ---
      if (phase !== lastIdxRef.current) {
        lastIdxRef.current = phase;
        setActive(phase);
      }
      const wantPhone = idx === 2 && s >= HANDOFF;
      if (wantPhone !== showPhoneRef.current) {
        showPhoneRef.current = wantPhone;
        setShowPhone(wantPhone);
      }
      const wantNotify = idx === 2 && s > NOTIFY_AT;
      if (wantNotify !== notifyRef.current) {
        notifyRef.current = wantNotify;
        setNotify(wantNotify);
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
      href="https://realestateinberlin.nestoririondo.com"
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
          Immobilien · Echter Kunde
        </span>
        {liveBtn}
      </div>
    </>
  );

  // continuous progress through the three chapters — driven imperatively via
  // barRef so it updates every frame without re-rendering the parent. Notches
  // mark the chapter boundaries so the fill reads against the 01/02/03 phases.
  const progressBar = (
    <div className="case-progress" aria-hidden>
      <div ref={barRef} className="case-progress__fill" />
      {REB_CHAPTERS.slice(1).map((_, i) => (
        <span
          key={i}
          className="case-progress__tick"
          style={{ left: `${((i + 1) / REB_CHAPTERS.length) * 100}%` }}
        />
      ))}
    </div>
  );

  const narrative = (
    <div className="case-left">
      {intro}
      <p style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.55, marginBottom: 22 }}>
        Statt die Immobilien nur über teure Portale zu zeigen, präsentiert REB
        sie jetzt auf der eigenen Website — live aus der Maklersoftware.
      </p>
      {!reduced && progressBar}
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
          REB Consulting · Echter Kunde
        </span>
        {liveBtn}
      </div>
      {progressBar}
      <div className="case-step case-step--compact is-active">
        <div
          ref={mHeadRef}
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
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
    // Let the "Anfrage gesendet" confirmation rest on the desktop view, then
    // fade it out before the phone rises in — a clean hand-off, no overlap.
    const showDesktop = active === 1 || (active === 2 && !showPhone);
    return (
      <div style={{ position: "relative", height: frameH }}>
        {/* 01 — Vorher (MiniSite brings its own dated browser chrome) */}
        <div style={layer(active === 0)}>
          <div style={{ ...cardStyle, height: "100%", overflow: "hidden" }}>
            <MiniSite kind="before" />
          </div>
        </div>

        {/* 02 — Jetzt: simulierter Klickpfad (Start → Properties → Objekt) */}
        <div style={{ ...layer(showDesktop), display: "grid", placeItems: "center" }}>
          <ClickThrough register={register} />
        </div>

        {/* 03 — Mobil, with a soft ambient backdrop behind the phone. */}
        <div style={{ ...layer(showPhone), display: "grid", placeItems: "center" }}>
          <MobileAmbientBackdrop />
          <div
            className={"case-phone-rise" + (showPhone ? " is-active" : "")}
            style={{ position: "relative", zIndex: 2 }}
          >
            <PhoneFrame width={mobile ? 216 : 252}>
              <RebMobile showNotification={notify} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    );
  };

  // --- reduced motion fallback: static stacked shots -------------------------
  if (reduced) {
    return (
      <div style={{ marginBottom: "clamp(64px,9vw,120px)" }}>
        <div className="reveal" style={{ display: "grid", gap: 32, transitionDelay: ".16s" }}>
          {narrative}
          <div style={cardStyle}>
            {chromeBar("realestateinberlin.nestoririondo.com/properties/2-zimmer-mariendorf")}
            <RebShot />
          </div>
          <div style={{ position: "relative", display: "grid", placeItems: "center", padding: "32px 0" }}>
            <MobileAmbientBackdrop />
            <div style={{ position: "relative", zIndex: 2 }}>
              <PhoneFrame width={208}>
                <RebMobile showNotification />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- pinned scrollytelling -------------------------------------------------
  return (
    <div style={{ marginBottom: "clamp(64px,9vw,120px)" }}>
      <div ref={wrapRef} style={{ height: `${TRAVEL * 100}vh`, position: "relative" }}>
        {mobile ? (
          <div className="case-pin reveal" style={{ position: "sticky", top: M_TOP, transitionDelay: ".16s" }}>
            {mobileHead}
            <div style={{ marginTop: 14 }}>
              {stage(`calc(100dvh - ${M_TOP} - 210px)`)}
            </div>
          </div>
        ) : (
          <div
            className="case-pin reveal"
            style={{
              position: "sticky",
              transitionDelay: ".16s",
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

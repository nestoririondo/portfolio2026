import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MiniSite } from "../../mockups/MiniSite";
import { PhoneFrame } from "../../mockups/Frames";
import { RebInteraction, RebMobile, RebShot } from "../../mockups/RebSite";
import { useI18n, type Messages } from "../../../i18n";

/**
 * Autoplaying case study (REB). The story plays itself on its own timeline the
 * first time the section scrolls into view — no scroll-pinning, so pacing and
 * responsiveness are fully under our control:
 *   - 01 Vorher: the old website rests,
 *   - 02 Nachher: the click-through plays the path (Start → Properties → Objekt)
 *     and the "Anfrage gesendet" confirmation lands on the desktop view,
 *   - 03 Das Ergebnis: the phone rises over a soft backdrop and the inbox banner
 *     drops in.
 * A small control bar (play/pause · step dots · replay) lets the viewer pause,
 * jump to a chapter, or rewatch.
 *
 * Performance: the timeline ticks every frame, but it must NOT re-render this
 * whole component each time. Per frame it only writes the progress-bar width and
 * pushes the click-through value through a registered setter (small subtree);
 * the discrete state (active chapter, desktop→phone hand-off, the banner) is
 * committed to React only on an actual transition — a handful of times per play.
 */

const FRAME_H = "min(600px, 68vh)"; // desktop stage height
// boundaries on 0..1 progress `p`: 01 short, 02 long, 03 short
const SEG = [0.08, 0.86];
const HANDOFF = 0.35; // within step 03's p-range: desktop view rests, then phone rises
const NOTIFY_AT = 0.4; // within step 03's p-range: the inbox banner drops
// progress at which the phone rises in. Until here the "Anfrage gesendet"
// confirmation rests on the desktop view — the climax of step 02 — so the
// stepper/progress keep reading 02, not 03.
const PHONE_AT = SEG[1] + HANDOFF * (1 - SEG[1]);
const MOBILE_Q = "(max-width: 920px)";

// Autoplay timeline: each story beat gets its OWN duration, decoupled from how
// much p-space it spans — so chapter 02 gets room to breathe and chapter 03
// never flies by. Each window maps an elapsed slice to a slice of progress `p`,
// which drives exactly the same visual state machine throughout.
const BEATS = [
  { p0: 0, p1: SEG[0], ms: 2500 }, // 01 Vorher holds
  { p0: SEG[0], p1: SEG[0], ms: 1300 }, // 02 opens on the homepage hero — holds before the cursor moves
  { p0: SEG[0], p1: SEG[1], ms: 6000 }, // 02 click-through plays the path — slower so the cursor moves feel natural, not snappy
  { p0: SEG[1], p1: PHONE_AT, ms: 900 }, //    "Anfrage gesendet" rests on desktop
  { p0: PHONE_AT, p1: 1, ms: 3200 }, // 03 phone rises, banner drops, holds
];
const TOTAL = BEATS.reduce((a, b) => a + b.ms, 0);
// cumulative start time of each window; STARTS[i] = start of BEATS[i], last = TOTAL
const STARTS = BEATS.reduce<number[]>(
  (a, b) => [...a, a[a.length - 1] + b.ms],
  [0],
);
// the three narrative chapters begin at the Vorher beat, the hero-hold beat, and
// the final Ergebnis beat — used by the seek dots
const CHAPTER_STARTS = [STARTS[0], STARTS[1], STARTS[BEATS.length - 1]];

function timeToP(t: number): number {
  let acc = 0;
  for (const b of BEATS) {
    if (t < acc + b.ms) return b.p0 + ((t - acc) / b.ms) * (b.p1 - b.p0);
    acc += b.ms;
  }
  return 1;
}

// invert progress `p` back to an elapsed time — for scrubbing the bar
function pToTime(p: number): number {
  p = Math.min(Math.max(p, 0), 1);
  let acc = 0;
  for (const b of BEATS) {
    if (p <= b.p1) {
      const span = b.p1 - b.p0;
      return acc + (span > 0 ? (p - b.p0) / span : 0) * b.ms;
    }
    acc += b.ms;
  }
  return TOTAL;
}

// the bar shows each chapter as an even third (with notches at 1/3, 2/3); map a
// clicked fraction of the bar back to progress `p`, then to a time
function fractionToTime(f: number): number {
  f = Math.min(Math.max(f, 0), 1);
  const n = 3; // 3 chapters
  let p: number;
  if (f < 1 / n) p = f * n * SEG[0];
  else if (f < 2 / n) p = SEG[0] + (f * n - 1) * (PHONE_AT - SEG[0]);
  else p = PHONE_AT + (f * n - 2) * (1 - PHONE_AT);
  return pToTime(p);
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.54.84l9.5-6.5a1 1 0 0 0 0-1.68l-9.5-6.5A1 1 0 0 0 8 5.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);
const ReplayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
    <path d="M3 4v5h5" />
  </svg>
);

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
      <span style={blob("28%", "28%", "42%", "var(--accent2)", 0.22)} />
      <span style={blob("72%", "62%", "38%", "#e9b04e", 0.18)} />
      <span
        style={{
          position: "absolute",
          inset: "10%",
          opacity: 0.18,
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
 * The step-02 visual. Owns the click-through progress in its own state and
 * exposes a setter through `register`, so per-frame updates re-render only this
 * small subtree — never the parent. Memoised so the parent's discrete
 * re-renders don't reset it.
 */
const ClickThrough = memo(function ClickThrough({
  register,
  fill,
}: {
  register: (set: (p: number) => void) => void;
  fill?: boolean;
}) {
  const [p, setP] = useState(0);
  useEffect(() => register(setP), [register]);
  return (
    <div
      style={{
        ...cardStyle,
        width: "100%",
        // on mobile the card fills the (clipped) stage so there's no dead gap and
        // nothing overflows; the site shows from the top and clips at the bottom
        ...(fill
          ? { height: "100%", display: "flex", flexDirection: "column" }
          : null),
      }}
    >
      {chromeBar("realestateinberlin.nestoririondo.com")}
      <div
        style={
          fill
            ? { flex: "1 1 auto", minHeight: 0, overflow: "hidden" }
            : undefined
        }
      >
        <RebInteraction progress={p} />
      </div>
    </div>
  );
});

export function StickyCase() {
  const { t } = useI18n();
  const chapters = t.arbeiten.reb.chapters;
  const [active, setActive] = useState(0);
  const [showPhone, setShowPhone] = useState(false); // step 03: phone has risen in
  const [notify, setNotify] = useState(false); // step 03: inbox banner visible
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" && !!window.matchMedia?.(MOBILE_Q).matches,
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null); // the scrub track
  const barRef = useRef<HTMLDivElement>(null); // steps-banner progress fill: width driven imperatively
  const setProgressRef = useRef<((p: number) => void) | null>(null);
  // timeline bookkeeping
  const rafRef = useRef(0);
  const startRef = useRef(0); // performance.now() − elapsed, while playing
  const elapsedRef = useRef(0); // current position in ms
  const playingRef = useRef(false);
  // mirror the discrete state in refs so the tick can setState only on an actual
  // transition instead of every frame
  const lastPhaseRef = useRef(0);
  const showPhoneRef = useRef(false);
  const notifyRef = useRef(false);

  const register = useCallback((set: (p: number) => void) => {
    setProgressRef.current = set;
  }, []);

  // Warm the case-study screenshots during browser idle time so they are decoded
  // and cached before the user reaches this (below-the-fold) section.
  useEffect(() => {
    const srcs = [
      "/img/reb/1.webp",
      "/img/reb/2.webp",
      "/img/reb/3.webp",
      "/img/reb/image.png",
    ];
    const warm = () =>
      srcs.forEach((s) => {
        const img = new Image();
        img.decoding = "async";
        img.src = s;
      });
    const hasRic = typeof window.requestIdleCallback === "function";
    const id = hasRic
      ? window.requestIdleCallback(warm, { timeout: 2500 })
      : window.setTimeout(warm, 1200);
    return () =>
      hasRic
        ? window.cancelIdleCallback?.(id as number)
        : clearTimeout(id as number);
  }, []);

  // media queries: mobile layout + reduced-motion (static fallback)
  useEffect(() => {
    const mq = window.matchMedia?.(MOBILE_Q);
    const onMq = () => setMobile(!!mq?.matches);
    mq?.addEventListener?.("change", onMq);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      setReduced(true);
    return () => mq?.removeEventListener?.("change", onMq);
  }, []);

  // Apply a progress value 0..1 to the visual state machine. Per-frame writes
  // (bar width, click-through) stay imperative; chapter/hand-off/banner commit to
  // React state only on a real change.
  const applyP = useCallback((p: number) => {
    let idx = 0;
    let s = 0;
    if (p >= SEG[1]) {
      idx = 2;
      s = (p - SEG[1]) / (1 - SEG[1]);
    } else if (p >= SEG[0]) {
      idx = 1;
      s = (p - SEG[0]) / (SEG[1] - SEG[0]);
    }
    // narrative phase tracks what's on screen, not the raw segments
    const phase = p >= PHONE_AT ? 2 : p >= SEG[0] ? 1 : 0;

    setProgressRef.current?.(idx === 2 ? 1 : s);
    if (barRef.current) {
      let local = 0;
      if (phase === 2) local = (p - PHONE_AT) / (1 - PHONE_AT);
      else if (phase === 1) local = (p - SEG[0]) / (PHONE_AT - SEG[0]);
      else local = SEG[0] > 0 ? p / SEG[0] : 0;
      const overall =
        (phase + Math.min(Math.max(local, 0), 1)) / 3;
      barRef.current.style.width = `${overall * 100}%`;
      progressRef.current?.setAttribute(
        "aria-valuenow",
        String(Math.round(overall * 100)),
      );
    }
    if (phase !== lastPhaseRef.current) {
      lastPhaseRef.current = phase;
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
  }, []);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const tick = useCallback(() => {
    const t = Math.min(performance.now() - startRef.current, TOTAL);
    elapsedRef.current = t;
    applyP(timeToP(t));
    if (t >= TOTAL) {
      playingRef.current = false;
      rafRef.current = 0;
      setPlaying(false);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [applyP]);

  // (re)start the timeline from a given elapsed position
  const startFrom = useCallback(
    (t: number) => {
      stop();
      elapsedRef.current = t;
      applyP(timeToP(t));
      startRef.current = performance.now() - t;
      playingRef.current = true;
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    },
    [applyP, stop, tick],
  );

  const play = useCallback(() => {
    if (playingRef.current) return;
    startFrom(elapsedRef.current >= TOTAL ? 0 : elapsedRef.current);
  }, [startFrom]);

  const pause = useCallback(() => {
    if (!playingRef.current) return;
    playingRef.current = false;
    setPlaying(false);
    stop();
  }, [stop]);

  const toggle = useCallback(() => {
    if (playingRef.current) pause();
    else play();
  }, [pause, play]);

  const replay = useCallback(() => startFrom(0), [startFrom]);
  const seek = useCallback(
    (chapter: number) => startFrom(CHAPTER_STARTS[chapter] ?? 0),
    [startFrom],
  );

  // click / drag anywhere on the progress bar to scrub to that point. While
  // dragging we just paint the frame (no playback churn); on release we resume.
  const beginScrub = useCallback(
    (e: React.PointerEvent) => {
      const el = progressRef.current;
      if (!el) return;
      e.preventDefault();
      const paint = (clientX: number) => {
        const r = el.getBoundingClientRect();
        const f = (clientX - r.left) / r.width;
        const t = fractionToTime(f);
        elapsedRef.current = t;
        applyP(timeToP(t));
      };
      playingRef.current = false;
      setPlaying(false);
      stop();
      paint(e.clientX);
      const move = (ev: PointerEvent) => paint(ev.clientX);
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        startFrom(elapsedRef.current); // resume playing from where it was dropped
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [applyP, stop, startFrom],
  );

  // keyboard scrubbing for the focused bar
  const onBarKey = useCallback(
    (e: React.KeyboardEvent) => {
      let t = elapsedRef.current;
      if (e.key === "ArrowRight") t = Math.min(TOTAL, t + 800);
      else if (e.key === "ArrowLeft") t = Math.max(0, t - 800);
      else if (e.key === "Home") t = 0;
      else if (e.key === "End") t = TOTAL;
      else return;
      e.preventDefault();
      startFrom(t);
    },
    [startFrom],
  );

  // autoplay once when the section first scrolls into view; show the Vorher
  // poster frame until then
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    applyP(timeToP(0));
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fired) {
          fired = true;
          play();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, applyP, play]);

  // stop the timeline on unmount
  useEffect(() => () => stop(), [stop]);

  // --- shared bits -----------------------------------------------------------

  const step = (
    c: Messages["arbeiten"]["reb"]["chapters"][number],
    on: boolean,
    compact = false,
  ) => (
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
      {t.arbeiten.reb.live}
    </a>
  );

  const intro = (
    <>
      <div className="case-title-row">
        <span className="case-index-pill" aria-hidden>01</span>
        <h3 style={{ fontSize: "clamp(26px,3vw,36px)" }}>
          REB Consulting GmbH
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: mobile ? 16 : 22,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          {t.arbeiten.reb.meta}
        </span>
        {liveBtn}
      </div>
    </>
  );

  // progress through the three chapters — fill width driven imperatively via
  // barRef. Notches mark the chapter boundaries so the fill reads against 01/02/03.
  const progressBar = (
    <div
      ref={progressRef}
      className="case-progress"
      role="slider"
      tabIndex={0}
      aria-label={t.arbeiten.reb.progressLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      onPointerDown={beginScrub}
      onKeyDown={onBarKey}
    >
      <div ref={barRef} className="case-progress__fill" />
      {chapters.slice(1).map((_, i) => (
        <span
          key={i}
          className="case-progress__tick"
          style={{ left: `${((i + 1) / chapters.length) * 100}%` }}
        />
      ))}
    </div>
  );

  // play/pause · seek dots · replay
  const controls = (
    <div className="case-controls">
      <button
        type="button"
        className="case-ctrl"
        onClick={toggle}
        aria-label={playing ? t.common.pause : t.common.play}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="case-dots">
        {chapters.map((c, i) => (
          <button
            key={i}
            type="button"
            className={"case-dot" + (active === i ? " is-active" : "")}
            onClick={() => seek(i)}
            aria-label={`${c.k} · ${c.title}`}
            aria-current={active === i ? "step" : undefined}
          />
        ))}
      </div>
      <button
        type="button"
        className="case-ctrl"
        onClick={replay}
        aria-label={t.common.replay}
      >
        <ReplayIcon />
      </button>
    </div>
  );

  // one chapter at a time — the timeline shows the others; this is just "now".
  // Keyed on `active` so each chapter mounts fresh and fades in (never doubled).
  // The same card drives both layouts, so the case reads identically everywhere.
  const activeStepCard = (compact: boolean) => (
    <div
      className={
        "case-step is-active" +
        (compact ? " case-step--compact" : " case-step--solo")
      }
    >
      <div
        key={active}
        className="case-step__swap"
        style={{ display: "flex", gap: 16, width: "100%" }}
      >
        {step(chapters[active], true, compact)}
      </div>
    </div>
  );

  // desktop left column: identity → the active chapter → transport. The standalone
  // thesis paragraph and the always-on 3-card stack are gone — the dots/progress
  // are the single navigation, and only the current beat is shown.
  const narrative = (
    <div className="case-left">
      {intro}
      {activeStepCard(false)}
      <div style={{ marginTop: 22 }}>
        {progressBar}
        {controls}
      </div>
    </div>
  );

  // --- mobile: three calm zones (identity · stage · player) ------------------
  // 1) identity — who/what, with the live link. One tidy two-line block.
  const mobileIdentity = (
    <div style={{ flex: "0 0 auto" }}>
      {/* title on its own line so it never wraps behind the pill */}
      <div className="case-title-row">
        <span className="case-index-pill" aria-hidden>01</span>
        <h3 style={{ fontSize: 20, lineHeight: 1.12 }}>
          REB Consulting GmbH
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span className="case-meta" style={{ marginBottom: 0 }}>
          {t.arbeiten.reb.meta}
        </span>
        {liveBtn}
      </div>
    </div>
  );

  // 3) player — the active chapter narrative with its transport (progress +
  //    controls) grouped right below the stage, like a video and its scrubber.
  const mobilePlayer = (
    <div style={{ flex: "0 0 auto" }}>
      {activeStepCard(true)}
      <div className="case-mobile-player" style={{ marginTop: 14 }}>
        {progressBar}
        {controls}
      </div>
    </div>
  );

  const stage = (frameH: string): ReactNode => {
    // `enter` delays the fade-in only, so an outgoing layer leads and the
    // incoming one follows a beat later — a soft hand-off instead of a hard cut.
    const layer = (show: boolean, enter = 0): CSSProperties => ({
      position: "absolute",
      inset: 0,
      opacity: show ? 1 : 0,
      transform: show ? "none" : "scale(.985)",
      transition: show
        ? `opacity .6s ease ${enter}s, transform .7s cubic-bezier(.2,.7,.2,1) ${enter}s`
        : "opacity .5s ease, transform .5s ease",
      pointerEvents: show ? "auto" : "none",
    });
    // Let the "Anfrage gesendet" confirmation rest on the desktop view, then fade
    // it out before the phone rises in — a clean hand-off, no overlap.
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
        <div
          style={{
            ...layer(showDesktop),
            display: "grid",
            placeItems: "center",
          }}
        >
          <ClickThrough register={register} fill={mobile} />
        </div>

        {/* 03 — Mobil, with a soft ambient backdrop behind the phone. The
            phone fades in a beat after the desktop view starts clearing. */}
        <div
          style={{
            ...layer(showPhone, 0.18),
            display: "grid",
            // on mobile the phone is taller than the (clipped) stage — top-align
            // it so the notification banner always shows and only the bottom clips
            placeItems: mobile ? "start center" : "center",
          }}
        >
          {/* on mobile the ambient is hoisted out to a full-bleed layer (see the
              mobile render); inside the clipped stage keep it only on desktop */}
          {!mobile && <MobileAmbientBackdrop />}
          <div
            className={"case-phone-rise" + (showPhone ? " is-active" : "")}
            style={{ position: "relative", zIndex: 2 }}
          >
            <PhoneFrame width={mobile ? 205 : 252}>
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
        <div
          className="reveal"
          style={{ display: "grid", gap: 32, transitionDelay: ".16s" }}
        >
          <div className="case-left">
            {intro}
            <p
              style={{
                fontSize: 17,
                color: "var(--ink)",
                lineHeight: 1.55,
                marginBottom: 22,
              }}
            >
              {t.arbeiten.reb.reducedMotionIntro}
            </p>
            <div className="case-steps">
              {chapters.map((c, i) => (
                <div key={i} className="case-step is-active">
                  {step(c, true)}
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle}>
            {chromeBar(
              "realestateinberlin.nestoririondo.com/properties/2-zimmer-mariendorf",
            )}
            <RebShot />
          </div>
          <div
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              padding: "32px 0",
            }}
          >
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

  // --- autoplaying case study ------------------------------------------------
  return (
    <div
      ref={sectionRef}
      style={{ marginBottom: "clamp(64px,9vw,120px)" }}
    >
      {mobile ? (
        // one coherent screen: title → visual (flexes to fill) → card + controls
        <div className="reveal case-mobile" style={{ transitionDelay: ".16s" }}>
          {/* full-bleed ambient that washes behind the whole case (and into the
              neighbouring sections) during the final beat — not clipped to the
              stage, so it reads as atmosphere rather than a boxed backdrop */}
          <div
            className={"case-mobile-ambient" + (active === 2 ? " is-on" : "")}
            aria-hidden
          >
            <MobileAmbientBackdrop />
          </div>
          {mobileIdentity}
          <div
            className={"case-mobile__stage" + (active === 2 ? " is-phone" : "")}
          >
            {stage("100%")}
          </div>
          {mobilePlayer}
        </div>
      ) : (
        <div
          className="reveal"
          style={{
            transitionDelay: ".16s",
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
        <span
          key={i}
          style={{ width: 10, height: 10, borderRadius: 99, background: c }}
        />
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
  boxShadow:
    "0 40px 90px -40px rgba(60,40,25,.5), 0 6px 16px -10px rgba(60,40,25,.25)",
  background: "#fff",
};

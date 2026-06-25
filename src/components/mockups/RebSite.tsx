/** Real Estate in Berlin — case-study mockups. */

import { type CSSProperties } from "react";

// 1/2/3 are the storyboard captures for the REB interaction:
// landing page -> properties list -> selected property with contact form.
const HERO = "/img/reb/1.webp";
const LISTING = "/img/reb/2.webp";
const DETAIL = "/img/reb/3.webp";

// intrinsic pixel ratios (w / h)
const LIST_R = 2085 / 4722; // tall properties list

const SHOT_RATIO = "2085 / 2033";
// Stop at the 7th property, not the absolute page bottom.
const LIST_SEVENTH_SHIFT = 52.5;
const HERO_CROP = {
  width: 82.5,
  height: 82,
  left: 8.6,
  top: 8.8,
};

// ---------------------------------------------------------------------------
// Scroll-driven simulated click-through (progress 0 → 1):
//   hero → click "Immobilien durchsuchen" → listing scrolls down → click the
//   7th property → detail page → pause → zoom into the form → type Name,
//   Email + Message → click "Send Message" → "Anfrage gesendet" confirmation.
// Positions are percentages of the visible frame. The listing screenshot is a
// tall image translated upward, so its click target is where the 7th card
// appears after LIST_SEVENTH_SHIFT has been reached.
// ---------------------------------------------------------------------------

const BROWSE = { x: 26, y: 75 }; // "Immobilien durchsuchen" on the hero
const LIST_CARD = { x: 44, y: 50 }; // 7th property after the list scroll
const NAME_FIELD = { x: 73.2, y: 35.8 };
const EMAIL_FIELD = { x: 73.2, y: 44.2 };
const MSG_FIELD = { x: 73.2, y: 57 };
const SUBMIT = { x: 83, y: 62 };
const ZOOM_ORIGIN = { x: 88, y: 34 }; // higher/right, toward the top of the form
const ZOOM_MAX = 1.65;
// the field coords sit a little below their inputs (the typed-text overlays apply
// their own upward nudge); lift the cursor/ripple by the same amount so the
// pointer lands ON each field rather than a row low. In detail-layer % units.
const FORM_CURSOR_LIFT = 4.6;

// overlaid text (typed fields + the confirmation toast) sizes against the
// click-through card via container units, so it never overflows on a small
// (mobile) frame; capped at 9px so the desktop size is unchanged.
const OVERLAY_FS = "clamp(5px, 1.7cqw, 9px)";

const NAME_TEXT = "Anna Schäfer";
const EMAIL_TEXT = "anna@example.de";
const MSG_TEXT = "Interesse an dieser Wohnung – bitte um Rückruf.";

const CLICK_1 = 0.15; // open properties
const CLICK_2 = 0.55; // click 7th property after a slow scroll + a long hover
const CLICK_3 = 0.983; // send message after form-filled pause + move to button + wait

interface Key {
  at: number;
  x: number;
  y: number;
}

// hero + listing leg — coordinates are FRAME % (compact intro: 0 → CLICK_2)
const PRE_KEYS: Key[] = [
  { at: 0, x: 16, y: 92 },
  { at: 0.04, x: 16, y: 92 },
  { at: 0.1, x: BROWSE.x, y: BROWSE.y }, // arrive at "Immobilien durchsuchen"
  { at: 0.2, x: BROWSE.x, y: BROWSE.y }, // pause (click at 0.15)
  { at: 0.29, x: BROWSE.x, y: BROWSE.y }, // hold on the full property list before it scrolls
  { at: 0.45, x: LIST_CARD.x, y: LIST_CARD.y }, // follow the list down (slow scroll 0.29→0.45)
  { at: 0.55, x: LIST_CARD.x, y: LIST_CARD.y }, // long hover on the property, then click at CLICK_2
];

const FORM_KEYS: Key[] = [
  { at: 0.55, x: LIST_CARD.x, y: LIST_CARD.y },
  { at: 0.66, x: LIST_CARD.x, y: LIST_CARD.y }, // rest on the detail page — let the viewer take in the property
  { at: 0.69, x: 58, y: 43 }, // then arc toward the form as the zoom kicks in
  // field stops are lifted by FORM_CURSOR_LIFT so the pointer lands ON each input
  // (the inputs sit a little above the raw FIELD.y). SUBMIT below is NOT lifted —
  // its coordinate already points at the button.
  { at: 0.73, x: NAME_FIELD.x, y: NAME_FIELD.y - FORM_CURSOR_LIFT }, // arrive at the name field (after the zoom)
  { at: 0.79, x: NAME_FIELD.x, y: NAME_FIELD.y - FORM_CURSOR_LIFT }, // typing the name
  { at: 0.8, x: EMAIL_FIELD.x, y: EMAIL_FIELD.y - FORM_CURSOR_LIFT }, // move to email
  { at: 0.85, x: EMAIL_FIELD.x, y: EMAIL_FIELD.y - FORM_CURSOR_LIFT }, // typing the email
  { at: 0.86, x: MSG_FIELD.x, y: MSG_FIELD.y - FORM_CURSOR_LIFT }, // move to message
  { at: 0.91, x: MSG_FIELD.x, y: MSG_FIELD.y - FORM_CURSOR_LIFT }, // typing the message
  { at: 0.93, x: MSG_FIELD.x, y: MSG_FIELD.y - FORM_CURSOR_LIFT }, // pause, form complete
  { at: 0.96, x: SUBMIT.x, y: SUBMIT.y }, // move to the button, then wait before clicking
  { at: 1, x: SUBMIT.x, y: SUBMIT.y },
];

function interp(keys: Key[], p: number): { x: number; y: number } {
  if (p <= keys[0].at) return keys[0];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i].at) {
      const a = keys[i - 1];
      const b = keys[i];
      const t = (p - a.at) / (b.at - a.at || 1);
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
  }
  return keys[keys.length - 1];
}

/** A one-shot expanding ring over a small window centred on `center`. */
function rippleAt(p: number, center: number, half = 0.05): { o: number; s: number } {
  const t = (p - (center - half)) / (2 * half);
  if (t < 0 || t > 1) return { o: 0, s: 0.3 };
  return { o: 1 - t, s: 0.3 + 1.7 * t };
}

/** 1 right at `center`, fading to 0 by ±half — the click "press". */
function nearness(p: number, center: number, half = 0.03): number {
  return Math.max(0, 1 - Math.abs(p - center) / half);
}

/** smootherstep ramp 0→1 across [a, b]. */
function ramp(p: number, a: number, b: number): number {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Reveal text char-by-char as progress crosses [a, b]. */
function typeText(text: string, p: number, a: number, b: number): string {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return text.slice(0, Math.round(t * text.length));
}

const Pointer = ({ scale }: { scale: number }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    style={{
      display: "block",
      transform: `scale(${scale})`,
      transformOrigin: "4px 3px",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,.35))",
      transition: "transform .12s ease",
    }}
  >
    <path
      d="M5 3 L5 19 L9.4 14.7 L12.4 21 L15 19.9 L12 13.6 L18 13.6 Z"
      fill="#fff"
      stroke="#1a1a1a"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const Caret = () => (
  <span
    style={{
      display: "inline-block",
      width: 1,
      height: "1em",
      marginLeft: 1,
      background: "var(--accent)",
      transform: "translateY(2px)",
    }}
  />
);

export function RebInteraction({ progress: p }: { progress: number }) {
  const heroOp = 1 - ramp(p, 0.16, 0.22);
  const listOp = ramp(p, 0.16, 0.22) * (1 - ramp(p, 0.55, 0.61));
  const detailOp = ramp(p, 0.55, 0.61);
  const listScroll = ramp(p, 0.29, 0.45); // list rests, then scrolls slowly to the 7th

  // Rest on the selected property page (full, un-zoomed) so the viewer can take
  // it in, THEN push higher/right into the form.
  const zoom = 1 + (ZOOM_MAX - 1) * ramp(p, 0.67, 0.74);

  // Keep the landing page fully readable before the cursor starts moving.
  const heroScale = 1;
  const heroShift = 0; // %

  const typedName = typeText(NAME_TEXT, p, 0.73, 0.79);
  const typedEmail = typeText(EMAIL_TEXT, p, 0.8, 0.85);
  const typedMsg = typeText(MSG_TEXT, p, 0.86, 0.91);
  const nameActive = p > 0.73 && p < 0.79;
  const emailActive = p > 0.8 && p < 0.85;
  const msgActive = p > 0.86 && p < 0.91;
  const showConfirm = p > 0.984; // the toast animates itself in via CSS on mount

  // map a detail-page point through the zoom. The detail layer is inset:0 (full
  // frame) and only scaled about ZOOM_ORIGIN, so x and y map the same way.
  const zxD = (x: number) => ZOOM_ORIGIN.x + (x - ZOOM_ORIGIN.x) * zoom;
  const zyD = (y: number) => ZOOM_ORIGIN.y + (y - ZOOM_ORIGIN.y) * zoom;

  // cursor: frame coords on the hero/listing leg, image→frame on the form leg
  let cx: number;
  let cy: number;
  if (p <= CLICK_2) {
    const f = interp(PRE_KEYS, p);
    cx = f.x;
    cy = f.y;
  } else {
    const i = interp(FORM_KEYS, p);
    cx = zxD(i.x);
    cy = zyD(i.y);
  }

  const r1 = rippleAt(p, CLICK_1);
  const r2 = rippleAt(p, CLICK_2);
  // tight window so the ring fires only once the cursor has reached the button
  const r3 = rippleAt(p, CLICK_3, 0.009);
  const press = Math.max(
    nearness(p, CLICK_1),
    nearness(p, CLICK_2),
    nearness(p, CLICK_3, 0.008),
  );
  const clickScale = 1 - 0.2 * press;

  const ring = (left: number, top: number, { o, s }: { o: number; s: number }): CSSProperties => ({
    position: "absolute",
    left: `${left}%`,
    top: `${top}%`,
    width: 54,
    height: 54,
    marginLeft: -27,
    marginTop: -27,
    borderRadius: "50%",
    border: "2px solid var(--accent)",
    opacity: o,
    transform: `scale(${s})`,
    pointerEvents: "none",
  });

  const fieldText = (left: number, top: number, on: boolean): CSSProperties => ({
    position: "absolute",
    left: `${left}%`,
    top: `${top}%`,
    width: "22%",
    maxHeight: "8%",
    overflow: "hidden",
    fontSize: OVERLAY_FS,
    lineHeight: 1.35,
    color: "#2b2b2b",
    background: "#f2f0ec",
    opacity: on ? 1 : 0,
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: SHOT_RATIO,
        overflow: "hidden",
        background: "#f2f0ec",
        containerType: "inline-size", // overlays size against this card (see OVERLAY_FS)
      }}
    >
      {/* hero — crop away the screenshot canvas padding so the site fills the frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: heroOp,
          transform: `scale(${heroScale}) translateY(${heroShift}%)`,
          transition: "opacity .12s linear, transform .12s linear",
          overflow: "hidden",
        }}
      >
        <img
          src={HERO}
          alt="REB — Startseite"
          draggable={false}
          style={{
            position: "absolute",
            left: `-${(HERO_CROP.left / HERO_CROP.width) * 100}%`,
            top: `-${(HERO_CROP.top / HERO_CROP.height) * 100}%`,
            width: `${(100 / HERO_CROP.width) * 100}%`,
            height: `${(100 / HERO_CROP.height) * 100}%`,
            objectFit: "fill",
            userSelect: "none",
          }}
        />
      </div>

      {/* listing (tall — scrolls to the 7th property before the click) */}
      <img
        src={LISTING}
        alt="REB — Immobilien"
        draggable={false}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          opacity: listOp,
          // translateZ(0) keeps this on its own compositor layer; no transform
          // transition since progress already advances it smoothly each frame
          // (a transform transition here just fights the per-frame update).
          transform: `translate3d(0, ${-LIST_SEVENTH_SHIFT * listScroll}%, 0)`,
          transition: "opacity .12s linear",
          willChange: "transform",
        }}
      />

      {/* detail / form page with its own zoom layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: detailOp,
          transformOrigin: `${ZOOM_ORIGIN.x}% ${ZOOM_ORIGIN.y}%`,
          transform: `scale(${zoom}) translateZ(0)`,
          transition: "opacity .12s linear",
          willChange: "transform",
        }}
      >
        <img
          src={DETAIL}
          alt="REB — Objektdetail"
          draggable={false}
          loading="lazy"
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />

        <div style={fieldText(NAME_FIELD.x - 5.3, NAME_FIELD.y - 5.9, !!typedName || nameActive)}>
          {typedName}
          {nameActive && <Caret />}
        </div>
        <div style={fieldText(EMAIL_FIELD.x - 5.3, EMAIL_FIELD.y - 6.35, !!typedEmail || emailActive)}>
          {typedEmail}
          {emailActive && <Caret />}
        </div>
        <div style={fieldText(MSG_FIELD.x - 5.3, MSG_FIELD.y - 5.4, !!typedMsg || msgActive)}>
          {typedMsg}
          {msgActive && <Caret />}
        </div>

        {showConfirm && (
          <div
            className="reb-confirm"
            style={{
              position: "absolute",
              left: "83%",
              top: "56%",
              display: "flex",
              alignItems: "center",
              gap: "0.55em",
              padding: "0.55em 1em",
              borderRadius: "0.78em",
              background: "#fff",
              border: "1px solid #dfe7da",
              boxShadow: "0 6px 18px -8px rgba(40,60,40,.5)",
              fontSize: OVERLAY_FS,
              fontWeight: 600,
              color: "#2f7d4f",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="reb-confirm__check"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.45em",
                height: "1.45em",
                borderRadius: "50%",
                background: "#2f7d4f",
                color: "#fff",
                fontSize: "1em",
              }}
            >
              ✓
            </span>
            Anfrage gesendet
          </div>
        )}
      </div>

      {/* click ripples */}
      <span style={ring(BROWSE.x, BROWSE.y, r1)} />
      <span style={ring(LIST_CARD.x, LIST_CARD.y, r2)} />
      <span style={ring(zxD(SUBMIT.x), zyD(SUBMIT.y), r3)} />

      {/* cursor — positioned with a GPU-composited transform instead of animating
          left/top. The layer fills the frame (100%×100%), so translate(cx%,cy%) —
          which is relative to the element's OWN size — lands exactly where
          left:cx%/top:cy% did. No transition: the timeline already advances it
          each frame, and a transition on a layout property (left/top) composites
          inconsistently on iOS Safari and made the moves look snappy. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          transform: `translate(${cx}%, ${cy}%)`,
          willChange: "transform",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Pointer scale={clickScale} />
      </div>
    </div>
  );
}

/** Static final state (the form page) — reduced-motion fallback. */
export function RebShot() {
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#fff" }}>
      <img
        src={DETAIL}
        alt="Real Estate in Berlin — Objektdetail"
        draggable={false}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  );
}

// --- mobile (step 03) keeps the existing long screenshot in the phone -------

const REB_LONG = "/img/reb/image.png";

export function RebMobile({ showNotification = false }: { showNotification?: boolean }) {
  return (
    <div style={{ position: "relative", width: "100%", background: "#f2f0ec", overflow: "hidden" }}>
      <img
        src={REB_LONG}
        alt="Real Estate in Berlin — mobile"
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          minHeight: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          userSelect: "none",
        }}
      />
      {showNotification && (
        <div className="ios-mail-banner ios-mail-banner--phone" aria-label="E-Mail-Benachrichtigung">
          <span className="ios-mail-banner__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M4.5 7.2 12 12.8l7.5-5.6" />
            </svg>
          </span>
          <div className="ios-mail-banner__text">
            <div className="ios-mail-banner__title">Neue Anfrage von Anna Schäfer</div>
            <div className="ios-mail-banner__meta">anna@example.de</div>
            <div className="ios-mail-banner__body">
              Interesse an dieser Wohnung – bitte um Rückruf.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import type { ReactNode } from "react";

export type ProcessGfx = "talk" | "plan" | "build";

/** Bolder-earthy accent pops, layered on top of the themed sage/stone. */
const CLAY = "#c06e4e";
const OCHRE = "#d8a24a";

/** A 4-point sparkle centered at the origin (radius ~6). */
const SPARKLE = "M0 -6 Q1.1 -1.1 6 0 Q1.1 1.1 0 6 Q-1.1 1.1 -6 0 Q-1.1 -1.1 0 -6 Z";

/** One absolutely-positioned, faded parallax layer; drifts via `data-px`. */
function FxLayer({ px, children }: { px: number; children: ReactNode }) {
  return (
    <div className="process-layer process-layer-bg" data-px={px} aria-hidden="true">
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        {children}
      </svg>
    </div>
  );
}

/**
 * Flat-geometric process graphic, split into depth layers:
 *  - a sharp, full-opacity hero motif on top
 *  - faded accent shapes behind it, each on its OWN parallax layer so they
 *    drift at independent speeds (relative to the passed-in `px`)
 * Colors use theme vars (var(--accent) etc.) so it follows the active theme,
 * with fixed clay/ochre accents for a warmer, less monotone pop.
 */
export function ProcessGraphic({ kind, px = 0.07 }: { kind: ProcessGfx; px?: number }) {
  return (
    <>
      {/* ── background accents: each its own layer + parallax speed ── */}
      {kind === "talk" && (
        <>
          <FxLayer px={px * 1.5}>
            <circle cx="98" cy="26" r="9" fill={OCHRE} />
          </FxLayer>
          <FxLayer px={px * -0.7}>
            <circle cx="20" cy="92" r="8" fill="none" stroke="var(--accent)" strokeWidth="3" />
          </FxLayer>
        </>
      )}

      {kind === "plan" && (
        <>
          <FxLayer px={px * 1.4}>
            <rect x="92" y="22" width="16" height="16" rx="4" fill={OCHRE} transform="rotate(14 100 30)" />
          </FxLayer>
          <FxLayer px={px * -0.6}>
            <circle cx="18" cy="90" r="7" fill="var(--accent)" />
          </FxLayer>
        </>
      )}

      {kind === "build" && (
        <>
          {/* celebration — every spark/confetti piece drifts independently */}
          <FxLayer px={px * 1.8}>
            <path d={SPARKLE} fill={OCHRE} transform="translate(102 24)" />
          </FxLayer>
          <FxLayer px={px * 0.5}>
          thank  <path d={SPARKLE} fill="var(--accent)" transform="translate(19 34) scale(0.72)" />
          </FxLayer>
          <FxLayer px={px * -0.9}>
            <circle cx="14" cy="66" r="3" fill={CLAY} />
          </FxLayer>
          <FxLayer px={px * 1.2}>
            <rect x="94" y="52" width="8" height="8" rx="2" fill={CLAY} transform="rotate(22 98 56)" />
          </FxLayer>
          <FxLayer px={px * -0.4}>
            <rect x="18" y="88" width="7" height="7" rx="2" fill={OCHRE} transform="rotate(-18 21 91)" />
          </FxLayer>
          <FxLayer px={px * 1.5}>
            <g stroke={OCHRE} strokeWidth="2.6" strokeLinecap="round">
              <line x1="110" y1="16" x2="115" y2="11" />
              <line x1="95" y1="13" x2="92" y2="7" />
              <line x1="113" y1="34" x2="119" y2="35" />
            </g>
          </FxLayer>
        </>
      )}

      {/* ── sharp hero motif on top ── */}
      <div className="process-layer process-layer-main" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          {kind === "talk" && (
            <>
              {/* two overlapping speech bubbles with bold outlines */}
              <path
                d="M30 32 L64 32 Q76 32 76 44 L76 60 Q76 72 64 72 L40 72 L27 83 L30 72 Q18 72 18 60 L18 44 Q18 32 30 32 Z"
                fill={CLAY}
                stroke="var(--ink)"
                strokeWidth="2.0"
                strokeLinejoin="round"
              />
              <g>
                <path
                  d="M62 50 L90 50 Q102 50 102 62 L102 74 Q102 86 90 86 L90 95 L78 86 L62 86 Q50 86 50 74 L50 62 Q50 50 62 50 Z"
                  fill="var(--accent)"
                  stroke="var(--ink)"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <circle cx="66" cy="68" r="3" fill="var(--paper)" />
                <circle cx="76" cy="68" r="3" fill="var(--paper)" />
                <circle cx="86" cy="68" r="3" fill="var(--paper)" />
              </g>
            </>
          )}
          {kind === "plan" && (
            <>
              {/* draft: a dashed sketch card you can click */}
              <g transform="rotate(-4 60 60)">
                <rect x="26" y="26" width="68" height="68" rx="11" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
                {/* dashed placeholder image */}
                <rect x="35" y="36" width="28" height="21" rx="3" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeDasharray="5 3.5" />
                {/* a couple of solid hint blocks → it's taking shape */}
                <rect x="69" y="37" width="16" height="6" rx="3" fill={OCHRE} />
                <rect x="69" y="48" width="13" height="6" rx="3" fill="var(--line)" />
                {/* dashed text lines */}
                <line x1="35" y1="67" x2="85" y2="67" stroke="var(--line)" strokeWidth="2.4" strokeDasharray="5 3.5" />
                <line x1="35" y1="76" x2="85" y2="76" stroke="var(--line)" strokeWidth="2.4" strokeDasharray="5 3.5" />
                <line x1="35" y1="85" x2="66" y2="85" stroke="var(--line)" strokeWidth="2.4" strokeDasharray="5 3.5" />
              </g>
              {/* click cursor → "klickbar" */}
              <g transform="translate(62 60)">
                <path d="M0 0 L0 24 L6 18 L10.5 27 L13.5 25.5 L9 16.5 L16.5 16.5 Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.8" strokeLinejoin="round" />
              </g>
            </>
          )}
          {kind === "build" && (
            <>
              {/* live: a finished, colorful site on a smartphone */}
              <rect x="38" y="22" width="44" height="74" rx="13" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
              {/* speaker slit */}
              <rect x="54" y="27.5" width="12" height="3" rx="1.5" fill="var(--line)" />
              {/* finished, colorful content */}
              <rect x="44" y="35" width="32" height="17" rx="4" fill="var(--accent)" />
              <rect x="44" y="56" width="14" height="7" rx="2.5" fill={OCHRE} />
              <rect x="62" y="56" width="14" height="7" rx="2.5" fill={CLAY} />
              <rect x="44" y="68" width="32" height="5" rx="2.5" fill="var(--line)" />
              <rect x="44" y="77" width="22" height="5" rx="2.5" fill="var(--line)" />
              {/* home indicator */}
              <rect x="52" y="89.5" width="16" height="2.6" rx="1.3" fill="var(--line)" />
              {/* success badge */}
              <g transform="translate(82 84)">
                <circle r="12.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="3.5" />
                <path d="M-5.4 0.5 l3.6 4 l7.2 -8.2" fill="none" stroke="var(--paper)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </>
          )}
        </svg>
      </div>
    </>
  );
}

export type ProcessGfx = "talk" | "plan" | "build";

/** Bolder-earthy accent pops, layered on top of the themed sage/stone. */
const CLAY = "#c06e4e";
const OCHRE = "#d8a24a";

/**
 * Flat-geometric process graphic, split into depth layers:
 *  - a faded background layer of accent shapes that drifts via `data-px`
 *  - a sharp, full-opacity hero motif on top
 * Colors use theme vars (var(--accent) etc.) so it follows the active theme,
 * with fixed clay/ochre accents for a warmer, less monotone pop.
 */
export function ProcessGraphic({ kind, px = 0.07 }: { kind: ProcessGfx; px?: number }) {
  return (
    <>
      <div className="process-layer process-layer-bg" data-px={px} aria-hidden="true">
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          {kind === "talk" && (
            <>
              <circle cx="98" cy="26" r="9" fill={OCHRE} />
              <circle cx="20" cy="92" r="8" fill="none" stroke="var(--accent)" strokeWidth="3" />
            </>
          )}
          {kind === "plan" && (
            <>
              <rect x="92" y="22" width="16" height="16" rx="4" fill={OCHRE} transform="rotate(14 100 30)" />
              <circle cx="18" cy="90" r="7" fill="var(--accent)" />
            </>
          )}
          {kind === "build" && (
            <>
              <circle cx="100" cy="30" r="9" fill={OCHRE} />
              <path d="M14 96 l11 0 l-5.5 -10 Z" fill="var(--accent)" />
            </>
          )}
        </svg>
      </div>

      <div className="process-layer process-layer-main" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          {kind === "talk" && (
            <>
              {/* two overlapping speech bubbles */}
              <g>
                <rect x="18" y="32" width="58" height="40" rx="13" fill={CLAY} />
                <path d="M30 70 l0 12 l13 -10 Z" fill={CLAY} />
              </g>
              <g>
                <rect x="50" y="50" width="52" height="36" rx="12" fill="var(--accent)" />
                <path d="M90 84 l0 11 l-12 -9 Z" fill="var(--accent)" />
                <circle cx="66" cy="68" r="3" fill="var(--paper)" />
                <circle cx="76" cy="68" r="3" fill="var(--paper)" />
                <circle cx="86" cy="68" r="3" fill="var(--paper)" />
              </g>
            </>
          )}
          {kind === "plan" && (
            <>
              {/* wireframe / browser window */}
              <rect x="22" y="26" width="76" height="68" rx="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
              <line x1="22" y1="42" x2="98" y2="42" stroke="var(--ink)" strokeWidth="3" />
              <circle cx="31" cy="34" r="2.4" fill={CLAY} />
              <circle cx="39" cy="34" r="2.4" fill={OCHRE} />
              <circle cx="47" cy="34" r="2.4" fill="var(--accent)" />
              <rect x="31" y="52" width="26" height="20" rx="3" fill={CLAY} />
              <rect x="63" y="52" width="26" height="5" rx="2.5" fill="var(--accent)" />
              <rect x="63" y="62" width="22" height="5" rx="2.5" fill="var(--accent)" />
              <rect x="31" y="80" width="58" height="5" rx="2.5" fill="var(--line)" />
            </>
          )}
          {kind === "build" && (
            <>
              {/* window + launch arrow */}
              <rect x="22" y="30" width="76" height="64" rx="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
              <line x1="22" y1="45" x2="98" y2="45" stroke="var(--ink)" strokeWidth="3" />
              <circle cx="31" cy="37.5" r="2.4" fill={CLAY} />
              <circle cx="39" cy="37.5" r="2.4" fill={OCHRE} />
              <g>
                <rect x="55" y="62" width="10" height="22" rx="3" fill={CLAY} />
                <path d="M60 50 l16 16 l-32 0 Z" fill={CLAY} />
              </g>
            </>
          )}
        </svg>
      </div>
    </>
  );
}

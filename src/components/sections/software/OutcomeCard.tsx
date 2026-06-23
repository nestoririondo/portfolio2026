import { useState } from "react";
import type { Outcome } from "../../../data/content";
import { Gfx } from "./Gfx";

/** One outcome: a mini-UI beside the copy, lifting on hover. */
export function OutcomeCard({ o }: { o: Outcome }) {
  const [hov, setHov] = useState(false);
  return (
    <div data-px={o.px} className="px-layer">
      <div
        className="oc-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "clamp(18px,2vw,26px)",
          borderRadius: 24,
          padding: "clamp(22px,2.4vw,30px)",
          background: hov
            ? "linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.02))"
            : "linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))",
          boxShadow: hov
            ? "inset 0 1px 0 rgba(255,255,255,.14), 0 50px 90px -55px var(--accent)"
            : "inset 0 1px 0 rgba(255,255,255,.08)",
          transform: hov ? "translateY(-6px)" : "none",
          transition:
            "transform .4s cubic-bezier(.2,.7,.2,1), background .35s, box-shadow .35s",
        }}
      >
        {/* mockup — tilted + breaking past the card edge so it floats above it.
            Its own [data-px] layer drifts faster than the card, for depth. */}
        <div
          className="oc-media"
          style={{
            flex: "0 0 clamp(200px,42%,270px)",
            margin: "clamp(-30px,-3.4vw,-20px) 0 clamp(-30px,-3.4vw,-20px) clamp(-44px,-4.4vw,-26px)",
          }}
        >
          <div data-px="0.05" className="px-layer">
            <div
              data-px-rotate={o.screenRotateSpeed}
              data-px-rotate-max="5"
              style={{
                transition: "transform .45s cubic-bezier(.2,.7,.2,1)",
                transform: hov
                  ? `rotate(calc(${o.screenTilt}deg + var(--px-rotate, 0deg))) translateY(-10px) scale(1.1)`
                  : `rotate(calc(${o.screenTilt}deg + var(--px-rotate, 0deg))) scale(1.06)`,
                willChange: "transform",
              }}
            >
              <Gfx type={o.gfx} fullWidth />
            </div>
          </div>
        </div>

        {/* copy */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "clamp(21px,2.2vw,27px)", color: "#fff", marginBottom: 8, lineHeight: 1.15 }}>
            {o.title}
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.66)", lineHeight: 1.55 }}>
            {o.body}
          </p>
        </div>
      </div>
    </div>
  );
}

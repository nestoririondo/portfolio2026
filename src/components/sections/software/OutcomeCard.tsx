import { useState } from "react";
import type { Outcome } from "../../../data/content";
import { Gfx } from "./Gfx";

/** One outcome: a mini-UI floating out of the top corner, lifting on hover. */
export function OutcomeCard({ o }: { o: Outcome }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-px={o.px}
      className="px-layer oc-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
        transform: hov ? "translateY(-6px)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -44,
          right: "clamp(8px,2.5%,22px)",
          zIndex: 3,
          transition: "transform .45s cubic-bezier(.2,.7,.2,1)",
          transform: hov ? "rotate(4deg) scale(1.04)" : "rotate(2.5deg)",
        }}
      >
        <Gfx type={o.gfx} />
      </div>
      <div
        style={{
          position: "relative",
          borderRadius: 24,
          padding: "clamp(114px,15vw,134px) clamp(24px,3vw,34px) clamp(26px,3vw,34px)",
          background: hov
            ? "linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.02))"
            : "linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))",
          boxShadow: hov
            ? "inset 0 1px 0 rgba(255,255,255,.14), 0 50px 90px -55px var(--accent)"
            : "inset 0 1px 0 rgba(255,255,255,.08)",
          transition: "background .35s, box-shadow .35s",
        }}
      >
        <h3 style={{ fontSize: "clamp(23px,2.5vw,30px)", color: "#fff", marginBottom: 8, lineHeight: 1.15 }}>
          {o.title}
        </h3>
        <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.66)", lineHeight: 1.55, maxWidth: 320 }}>
          {o.body}
        </p>
      </div>
    </div>
  );
}

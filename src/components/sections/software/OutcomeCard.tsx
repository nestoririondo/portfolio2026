import { useState } from "react";
import type { Outcome } from "../../../data/content";
import { Gfx } from "./Gfx";

/** One outcome: a floating mini-UI over an open panel, lifting on hover. */
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
        marginTop: "clamp(64px,8vw,88px)",
        transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
        transform: hov ? "translateY(-6px)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -58,
          left: "clamp(18px,4%,34px)",
          zIndex: 3,
          transition: "transform .45s cubic-bezier(.2,.7,.2,1)",
          transform: hov ? "rotate(-4deg) scale(1.04)" : "rotate(-2.5deg)",
        }}
      >
        <Gfx type={o.gfx} />
      </div>
      <div
        style={{
          position: "relative",
          borderRadius: 28,
          padding: "150px clamp(26px,3vw,38px) clamp(30px,3vw,40px)",
          background: hov
            ? "linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.02))"
            : "linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))",
          boxShadow: hov
            ? "inset 0 1px 0 rgba(255,255,255,.14), 0 50px 90px -55px var(--accent)"
            : "inset 0 1px 0 rgba(255,255,255,.08)",
          transition: "background .35s, box-shadow .35s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 16,
            fontFamily: "var(--font-head)",
            fontSize: 120,
            lineHeight: 1,
            fontWeight: 600,
            color: "rgba(255,255,255,.05)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {o.n}
        </span>
        <h3 style={{ fontSize: "clamp(25px,2.7vw,34px)", color: "#fff", marginBottom: 9, lineHeight: 1.1 }}>
          {o.title}
        </h3>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.66)", lineHeight: 1.55, maxWidth: 300 }}>
          {o.body}
        </p>
      </div>
    </div>
  );
}

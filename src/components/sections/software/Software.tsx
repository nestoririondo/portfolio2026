import { useRef } from "react";
import { OUTCOMES } from "../../../data/content";
import { useParallax } from "../../../hooks/useParallax";
import { Icon } from "../../ui/Icon";
import { OutcomeCard } from "./OutcomeCard";

export function Software() {
  const secRef = useRef<HTMLElement>(null);
  useParallax(secRef);

  return (
    <section
      ref={secRef}
      id="software"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--ink)",
        color: "#fff",
        padding: "clamp(64px,9vw,120px) 0",
      }}
    >
      {/* parallax orbs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          data-px="0.16"
          style={{
            position: "absolute",
            top: "6%",
            left: "-6%",
            width: "42vw",
            height: "42vw",
            maxWidth: 560,
            maxHeight: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, color-mix(in oklab,var(--accent) 55%,transparent), transparent 68%)",
            filter: "blur(20px)",
            opacity: 0.55,
          }}
        />
        <div
          data-px="-0.12"
          style={{
            position: "absolute",
            bottom: "2%",
            right: "-8%",
            width: "46vw",
            height: "46vw",
            maxWidth: 620,
            maxHeight: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 60% 40%, color-mix(in oklab,var(--accent) 42%,#000 8%), transparent 66%)",
            filter: "blur(26px)",
            opacity: 0.5,
          }}
        />
        <div
          data-px="0.1"
          style={{
            position: "absolute",
            top: "40%",
            right: "30%",
            width: "18vw",
            height: "18vw",
            maxWidth: 230,
            maxHeight: 230,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in oklab,var(--accent) 35%,transparent), transparent 70%)",
            filter: "blur(18px)",
            opacity: 0.45,
          }}
        />
      </div>

      <div className="wrap" style={{ position: "relative" }}>
        <div className="reveal" style={{ maxWidth: 740, marginBottom: "clamp(36px,5vw,60px)" }}>
          <span className="eyebrow" style={{ color: "color-mix(in oklab,var(--accent) 60%,#fff)" }}>
            Was Ihre Website für Sie tut
          </span>
          <h2 style={{ fontSize: "clamp(31px,4.2vw,50px)", marginTop: 16, color: "#fff" }}>
            Sie führen Ihr Geschäft. Die Website erledigt den Rest.
          </h2>
        </div>

        <div
          className="reveal outcome-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(54px,7vw,78px) clamp(16px,2vw,26px)",
          }}
        >
          {OUTCOMES.map((o) => (
            <OutcomeCard key={o.n} o={o} />
          ))}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: "clamp(36px,5vw,56px)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a href="#kontakt" className="btn" style={{ background: "var(--accent)", color: "#fff" }}>
            Was darf Ihre Website können? <Icon name="arrow" size={18} />
          </a>
          <span style={{ fontSize: 15, color: "rgba(255,255,255,.55)" }}>
            Erzählen Sie mir, was Ihnen Arbeit abnehmen würde.
          </span>
        </div>
      </div>
    </section>
  );
}

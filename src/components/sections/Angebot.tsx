import { useRef } from "react";
import { OFFER_INCLUDED, OFFER_PROCESS } from "../../data/content";
import { useParallax } from "../../hooks/useParallax";
import { ProcessGraphic } from "./ProcessGraphic";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

export function Angebot() {
  const secRef = useRef<HTMLElement>(null);
  useParallax(secRef);

  return (
    <section
      ref={secRef}
      id="angebot"
      style={{
        background: "var(--accent-tint)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "clamp(64px,9vw,120px) 0",
      }}
    >
      <div className="wrap">
        <div className="reveal">
          <SectionHeading
            eyebrow="So läuft’s"
            title="Erst verstehen, dann bauen."
            sub="Von der Idee zur fertigen Website – bei jedem Schritt siehst du ein echtes Zwischenergebnis. Du sagst mir dein Ziel, um den Rest kümmere ich mich."
          />
        </div>

        {/* 1 → 2 → 3 deliverable timeline */}
        <div className="reveal process-flow" style={{ marginBottom: "clamp(40px,6vw,64px)" }}>
          {OFFER_PROCESS.map((step, i) => (
            <div className="process-step" key={step.n}>
              <span className="process-num">{step.n}</span>
              <div className={`process-icon${step.gfx ? " process-icon--gfx" : ""}`}>
                {step.gfx ? (
                  <ProcessGraphic kind={step.gfx} px={i % 2 === 0 ? 0.1 : -0.07} />
                ) : (
                  <Icon name={step.icon} size={68} stroke={1.4} />
                )}
              </div>
              <h3 style={{ fontSize: 25, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.55 }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* one consolidated price card */}
        <div className="reveal price-card">
          <div className="price-card-head">
            <span className="price-tag">
              <Icon name="spark" size={14} color="var(--accent)" /> Komplett-Website
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 8,
                margin: "16px 0 6px",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 500, color: "var(--muted)" }}>ab</span>
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "clamp(46px,6vw,64px)",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                2.500 €
              </span>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 15 }}>
              Fairer Festpreis, nach dem Gespräch festgelegt.
            </div>
          </div>

          <div className="price-included-label">Alles dabei:</div>
          <div className="price-included">
            {OFFER_INCLUDED.map((t) => (
              <div key={t} className="price-included-item">
                <span className="price-check">
                  <Icon name="check" size={13} stroke={3} color="var(--accent)" />
                </span>
                {t}
              </div>
            ))}
          </div>

          <a
            href="#kontakt"
            className="btn btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
          >
            Kostenloses Erstgespräch <Icon name="arrow" size={18} />
          </a>
          <p className="price-reassure">
            Unverbindlich · keine versteckten Kosten
          </p>
        </div>
      </div>
    </section>
  );
}

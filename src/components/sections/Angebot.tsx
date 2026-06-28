import { useRef } from "react";
import { OFFER_PROCESS } from "../../data/content";
import { useParallax } from "../../hooks/useParallax";
import { ProcessGraphic } from "./ProcessGraphic";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "../../i18n";

export function Angebot() {
  const secRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
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
            eyebrow={t.angebot.heading.eyebrow}
            title={t.angebot.heading.title}
            sub={t.angebot.heading.sub}
          />
        </div>

        {/* 1 → 2 → 3 deliverable timeline */}
        <div
          ref={flowRef}
          className="process-flow"
          style={{ margin: "clamp(56px,8vw,96px) 0" }}
        >
          {OFFER_PROCESS.map((step, i) => {
            const copy = t.angebot.steps[i];
            return (
            <div className="reveal process-step" key={step.n}>
              <span className="process-num">{step.n}</span>
              <div className={`process-icon${step.gfx ? " process-icon--gfx" : ""}`}>
                {step.gfx ? (
                  <ProcessGraphic kind={step.gfx} px={i % 2 === 0 ? 0.1 : -0.07} />
                ) : (
                  <Icon name={step.icon} size={68} stroke={1.4} />
                )}
              </div>
              <h3 style={{ fontSize: 25, marginBottom: 8 }}>{copy.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.55 }}>{copy.body}</p>
              {copy.meta ? <span className="process-meta">{copy.meta}</span> : null}
            </div>
          );})}
        </div>

        {/* simple pricing: one anchor, then the few things that change scope */}
        <div className="reveal" style={{ marginBottom: "clamp(34px,5vw,52px)" }}>
          <SectionHeading
            eyebrow={t.angebot.pricing.eyebrow}
            title={t.angebot.pricing.title}
            sub={t.angebot.pricing.sub}
          />
        </div>

        <div className="reveal price-simple">
          <div className="price-simple-main">
            <span className="price-tag">
              <Icon name="spark" size={14} color="var(--accent)" /> {t.angebot.pricing.kicker}
            </span>
            <p className="price-range-label">{t.angebot.pricing.rangeLabel}</p>
            <div className="price-range">
              <span>{t.angebot.pricing.rangeFrom}</span>
              <span className="price-range-to">– {t.angebot.pricing.rangeTo}</span>
            </div>
            <p className="price-range-note">{t.angebot.pricing.rangeNote}</p>
          </div>

          <div className="price-simple-side">
            <h3>{t.angebot.pricing.driversTitle}</h3>
            <div className="price-drivers">
              {t.angebot.pricing.drivers.map((driver) => (
                <div key={driver} className="price-driver">
                  <span className="price-check">
                    <Icon name="check" size={13} stroke={3} color="var(--accent)" />
                  </span>
                  <span>{driver}</span>
                </div>
              ))}
            </div>
            <div className="price-edges">
              {t.angebot.pricing.edges.map((edge) => (
                <div key={edge.label} className="price-edge">
                  <span>{edge.label}</span>
                  <strong>{edge.price}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal price-foot">
          <div className="price-recurring">
            <Icon name="check" size={14} stroke={3} color="var(--accent)" />
            <span>
              <strong>{t.angebot.recurringStrong}</strong> {t.angebot.recurringRest}
            </span>
          </div>
          <a
            href="#kontakt"
            className="btn btn-primary price-foot-cta"
            style={{ justifyContent: "center" }}
          >
            {t.angebot.cta} <Icon name="arrow" size={18} />
          </a>
          <p className="price-reassure">{t.angebot.reassure}</p>
        </div>
      </div>
    </section>
  );
}

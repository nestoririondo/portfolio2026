import { useEffect, useRef, useState } from "react";
import { OFFER_PROCESS } from "../../data/content";
import { useParallax } from "../../hooks/useParallax";
import { ProcessGraphic } from "./ProcessGraphic";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "../../i18n";

export function Angebot() {
  const secRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // The price card holds back until the 3-step sequence has finished building
  // in (stepsDone) *and* the card itself is in view (cardInView).
  const [stepsDone, setStepsDone] = useState(false);
  const [cardInView, setCardInView] = useState(false);
  const { t } = useI18n();
  useParallax(secRef);

  // Mark the step sequence "done" once the last step finishes its pop-in.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStepsDone(true);
      return;
    }
    const last = flowRef.current?.querySelector<HTMLElement>(
      ".process-step:last-child",
    );
    if (!last) {
      setStepsDone(true);
      return;
    }
    let fallback: number | undefined;
    const onEnd = (e: TransitionEvent) => {
      if (e.target === last && e.propertyName === "transform") {
        setStepsDone(true);
      }
    };
    last.addEventListener("transitionend", onEnd);
    // Safety net in case transitionend is missed: once the last step is in
    // view, allow the card after the longest possible step animation.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fallback = window.setTimeout(() => setStepsDone(true), 2200);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(last);
    return () => {
      last.removeEventListener("transitionend", onEnd);
      io.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, []);

  // Track whether the price card has scrolled into view.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCardInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

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

        {/* one consolidated price card */}
        <div
          ref={cardRef}
          data-reveal-defer
          className={`reveal price-card${stepsDone && cardInView ? " in" : ""}`}
        >
          <div className="price-card-head">
            <span className="price-tag">
              <Icon name="spark" size={14} color="var(--accent)" /> {t.angebot.priceTag}
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
              <span style={{ fontSize: 20, fontWeight: 500, color: "var(--muted)" }}>{t.angebot.from}</span>
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "clamp(46px,6vw,64px)",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {t.angebot.price}
              </span>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 15 }}>
              {t.angebot.priceNote}
            </div>
            <div className="price-recurring">
              <strong>{t.angebot.recurringStrong}</strong> {t.angebot.recurringRest}
            </div>
          </div>

          <div className="price-included-label">{t.angebot.includedLabel}</div>
          <div className="price-included">
            {t.angebot.included.map((item) => (
              <div key={item} className="price-included-item">
                <span className="price-check">
                  <Icon name="check" size={13} stroke={3} color="var(--accent)" />
                </span>
                {item}
              </div>
            ))}
          </div>

          <a
            href="#kontakt"
            className="btn btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
          >
            {t.angebot.cta} <Icon name="arrow" size={18} />
          </a>
          <p className="price-reassure">
            {t.angebot.reassure}
          </p>
        </div>
      </div>
    </section>
  );
}

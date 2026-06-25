import { useRef } from "react";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { Blob } from "../ui/Decorations";
import { useParallax } from "../../hooks/useParallax";
import type { HeroLayout } from "../../theme/themes";
import { useI18n } from "../../i18n";

function Portrait({ wide }: { wide?: boolean }) {
  const { t } = useI18n();
  return (
    <div style={{ position: "relative" }}>
      <Blob
        color="color-mix(in oklab,var(--accent2) 26%,transparent)"
        floatDuration={12.5}
        floatDelay={-1.2}
        floatY={-9}
        style={{
          position: "absolute",
          width: "62%",
          top: "-13%",
          right: "-11%",
          zIndex: 0,
        }}
      />
      <Blob
        color="color-mix(in oklab,#f0db8a 45%,transparent)"
        d="M54,-63C70,-52,82,-35,85,-16C88,3,82,24,71,41C60,58,44,71,25,76C5,81,-17,78,-39,69C-61,60,-83,45,-89,25C-95,5,-85,-21,-70,-40C-56,-59,-37,-71,-17,-75C4,-79,25,-74,54,-63Z"
        floatDuration={16}
        floatDelay={-5}
        floatY={-13}
        style={{
          position: "absolute",
          width: "78%",
          top: "26%",
          left: "-12%",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      {/* scroll-parallax layer (JS writes an inline transform here) */}
      <div data-px={0.04} style={{ position: "relative", zIndex: 1 }}>
        {/* gentle-float layer (CSS animates a transform here — kept separate
            from the parallax wrapper so the two transforms don't collide) */}
        <div className="photo-float" style={{ position: "relative" }}>
          <Photo
            src="/img/portrait-hero.webp"
            alt={t.hero.photoAlt}
            label={t.hero.photoLabel}
            ratio={wide ? "5 / 4" : "4 / 5"}
            round={22}
          />
          <div
            className="hero-avail"
            style={{
              position: "absolute",
              zIndex: 2,
              left: wide ? "auto" : -16,
              right: wide ? 16 : "auto",
              bottom: wide ? 16 : 24,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: "10px 14px",
              boxShadow: "0 18px 40px -22px rgba(60,40,25,.45)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="avail-dot"
              style={{
                width: 9,
                height: 9,
                borderRadius: 99,
                background: "#5db469",
                boxShadow: "0 0 0 4px color-mix(in oklab,#5db469 22%,transparent)",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {t.hero.availability}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero({ layout }: { layout: HeroLayout }) {
  const secRef = useRef<HTMLElement>(null);
  const { t } = useI18n();
  useParallax(secRef);
  const centered = layout === "centered";
  const eyebrow = (
    <span className="eyebrow">{t.hero.eyebrow}</span>
  );
  const h1 = (
    <h1 style={{ fontSize: "clamp(38px, 6vw, 68px)", margin: "18px 0 0" }}>
      {t.hero.title}
    </h1>
  );
  const sub = (
    <p
      style={{
        fontSize: "clamp(17px,1.5vw,21px)",
        color: "var(--muted)",
        maxWidth: 560,
        margin: centered ? "20px auto 0" : "22px 0 0",
        lineHeight: 1.55,
      }}
    >
      {t.hero.subtitle}
    </p>
  );
  const ctas = (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 28,
        flexWrap: "wrap",
        justifyContent: centered ? "center" : "flex-start",
      }}
    >
      <a href="#kontakt" className="btn btn-primary">
        {t.hero.primaryCta} <Icon name="arrow" size={18} />
      </a>
      <a href="#arbeiten" className="btn btn-ghost">
        {t.hero.secondaryCta}
      </a>
    </div>
  );
  const trust = (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 30,
        flexWrap: "wrap",
        justifyContent: centered ? "center" : "flex-start",
      }}
    >
      <span className="chip">
        <Icon name="globe" size={16} /> {t.hero.trust[0]}
      </span>
      <span className="chip">
        <Icon name="check" size={16} /> {t.hero.trust[1]}
      </span>
    </div>
  );

  return (
    <section
      ref={secRef}
      id="top"
      className="hero-band"
      style={{
        /* clear the fixed 72px header before the hero content begins */
        paddingTop: "calc(72px + clamp(24px,5vw,64px))",
        paddingBottom: "clamp(40px,6vw,86px)",
      }}
    >
      <div className="wrap">
        {centered ? (
          <div
            className="reveal"
            style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}
          >
            {eyebrow}
            {h1}
            {sub}
            {ctas}
            {trust}
            <div style={{ maxWidth: 760, margin: "48px auto 0" }}>
              <Portrait wide />
            </div>
          </div>
        ) : (
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr .85fr",
              gap: "clamp(28px,5vw,70px)",
              alignItems: "center",
            }}
          >
            <div className="reveal">
              {eyebrow}
              {h1}
              {sub}
              {ctas}
              {trust}
            </div>
            <div className="reveal hero-portrait" style={{ transitionDelay: ".12s" }}>
              <Portrait />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

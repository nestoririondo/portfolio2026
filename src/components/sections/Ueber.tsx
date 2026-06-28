import { useRef } from "react";
import { ABOUT_CHIPS } from "../../data/content";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { Blob } from "../ui/Decorations";
import { useParallax } from "../../hooks/useParallax";
import { useI18n } from "../../i18n";

export function Ueber() {
  const secRef = useRef<HTMLElement>(null);
  const { t } = useI18n();
  useParallax(secRef);
  return (
    <section
      ref={secRef}
      id="ueber"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(64px,9vw,120px) 0",
      }}
    >
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="reveal ueber-grid"
          style={{
            display: "grid",
            gridTemplateColumns: ".85fr 1.15fr",
            gap: "clamp(28px,5vw,64px)",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <Blob
              color="color-mix(in oklab,var(--accent2) 24%,transparent)"
              floatDuration={11.67}
              floatDelay={-3.5}
              floatY={-13.2}
              style={{
                position: "absolute",
                width: "58%",
                bottom: "-12%",
                left: "-12%",
                zIndex: 0,
              }}
            />
            {/* scroll-parallax layer (JS transform) wrapping the float layer (CSS transform) */}
            <div data-px={-0.05} style={{ position: "relative", zIndex: 1 }}>
              <div className="photo-float delay">
                <Photo
                  src="/img/portrait-about.jpg"
                  alt={t.ueber.photoAlt}
                  label={t.ueber.photoLabel}
                  ratio="4 / 5"
                  round={22}
                />
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Blob
              color="color-mix(in oklab,#e9b04e 20%,transparent)"
              floatDuration={14.58}
              floatDelay={-7}
              floatY={-9.6}
              style={{
                position: "absolute",
                width: "56%",
                top: "-26%",
                right: "0%",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
            <span className="eyebrow">{t.ueber.eyebrow}</span>
            <h2
              style={{
                fontSize: "clamp(34px,5vw,54px)",
                letterSpacing: "-.02em",
                margin: "18px 0 22px",
              }}
            >
              {t.ueber.title}
            </h2>
            <p
              style={{
                fontSize: 18.5,
                color: "var(--muted)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              {t.ueber.body[0]}
              <br />
              <br />
              {t.ueber.body[1]}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ABOUT_CHIPS.map(({ icon }, i) => (
                <span key={t.ueber.chips[i]} className="chip">
                  <Icon name={icon} size={16} /> {t.ueber.chips[i]}
                </span>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

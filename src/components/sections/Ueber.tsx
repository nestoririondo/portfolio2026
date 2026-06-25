import { useRef } from "react";
import { ABOUT_CHIPS } from "../../data/content";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { Blob } from "../ui/Decorations";
import { useParallax } from "../../hooks/useParallax";

export function Ueber() {
  const secRef = useRef<HTMLElement>(null);
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
              dataPx={-0.07}
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
                  alt="Néstor in Berlin Alt-Treptow"
                  label="Portrait · Néstor"
                  ratio="4 / 5"
                  round={22}
                />
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Blob
              color="color-mix(in oklab,#e9b04e 20%,transparent)"
              dataPx={0.04}
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
            <span className="eyebrow">Über mich</span>
            <h2
              style={{
                fontSize: "clamp(34px,5vw,54px)",
                letterSpacing: "-.02em",
                margin: "18px 0 22px",
              }}
            >
              Hallo, ich bin Néstor.
            </h2>
            <p
              style={{
                fontSize: 18.5,
                color: "var(--muted)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Ich entwickle hauptberuflich Software und baue Websites mit
              demselben Anspruch: schnell, stabil und verständlich.
              <br />
              <br />
              Du musst dich nicht mit Technik beschäftigen. Ich übersetze deine
              Idee in eine Website, die gut aussieht, funktioniert und dir
              Anfragen bringt.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ABOUT_CHIPS.map(({ icon, label }) => (
                <span key={label} className="chip">
                  <Icon name={icon} size={16} /> {label}
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

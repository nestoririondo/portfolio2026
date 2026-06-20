import { Icon } from "../ui/Icon";
import { Placeholder } from "../ui/Placeholder";
import type { HeroLayout } from "../../theme/themes";

function Portrait({ wide }: { wide?: boolean }) {
  return (
    <div style={{ position: "relative" }}>
      <Placeholder label="Portrait · Nestor" ratio={wide ? "5 / 4" : "4 / 5"} round={22} />
      <div
        style={{
          position: "absolute",
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
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 99,
            background: "#5db469",
            boxShadow: "0 0 0 4px color-mix(in oklab,#5db469 22%,transparent)",
          }}
        />
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Verfügbar für neue Projekte
        </span>
      </div>
    </div>
  );
}

export function Hero({ layout }: { layout: HeroLayout }) {
  const centered = layout === "centered";
  const eyebrow = (
    <span className="eyebrow">Webentwickler · Berlin Alt-Treptow</span>
  );
  const h1 = (
    <h1 style={{ fontSize: "clamp(38px, 6vw, 68px)", margin: "18px 0 0" }}>
      Websites, die für Sie arbeiten.
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
      Termine buchen sich von selbst, Angebote bleiben aktuell, Anfragen kommen
      direkt an. Ich baue Websites in Berlin, die Ihnen den Rücken freihalten.
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
        Projekt anfragen <Icon name="arrow" size={18} />
      </a>
      <a href="#arbeiten" className="btn btn-ghost">
        Arbeiten ansehen
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
        <Icon name="globe" size={16} /> DE · EN · ES
      </span>
      <span className="chip">
        <Icon name="check" size={16} /> Festpreis ab 2.500 €
      </span>
    </div>
  );

  return (
    <section
      id="top"
      style={{
        paddingTop: "clamp(30px,5vw,64px)",
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
            <div className="reveal" style={{ transitionDelay: ".12s" }}>
              <Portrait />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

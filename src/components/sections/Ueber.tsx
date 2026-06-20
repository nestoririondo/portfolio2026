import { ABOUT_CHIPS } from "../../data/content";
import { Icon } from "../ui/Icon";
import { Placeholder } from "../ui/Placeholder";

export function Ueber() {
  return (
    <section id="ueber" style={{ padding: "clamp(50px,7vw,100px) 0" }}>
      <div className="wrap">
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
            <Placeholder label="Portrait · Nestor" ratio="4 / 5" round={22} />
          </div>
          <div>
            <span className="eyebrow">Über mich</span>
            <h2 style={{ fontSize: "clamp(30px,4vw,46px)", margin: "14px 0 20px" }}>
              Hallo, ich bin Nestor.
            </h2>
            <p style={{ fontSize: 18.5, color: "var(--muted)", marginBottom: 24, lineHeight: 1.6 }}>
              Hauptberuflich entwickle ich Software in Berlin. Websites baue ich
              mit demselben Anspruch: solide, durchdacht, ohne Kompromisse. Ich
              wohne in Alt-Treptow und arbeite auf Deutsch, Englisch und Spanisch.
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
    </section>
  );
}

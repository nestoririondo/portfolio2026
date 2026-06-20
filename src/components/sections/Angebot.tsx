import { OFFER_HIGHLIGHTS, OFFER_INCLUDED } from "../../data/content";
import { Icon } from "../ui/Icon";

export function Angebot() {
  return (
    <section
      id="angebot"
      style={{
        background: "var(--accent-tint)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "clamp(50px,7vw,96px) 0",
      }}
    >
      <div className="wrap">
        <div className="reveal" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 40px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Angebot
          </span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 14 }}>
            Eine Website, ein Festpreis.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 16 }}>
            Kein Baukasten, keine versteckten Kosten. Alles, was ein kleines
            Unternehmen wirklich braucht — fertig gemacht.
          </p>
        </div>

        <div
          className="reveal hl-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 18,
            marginBottom: 30,
          }}
        >
          {OFFER_HIGHLIGHTS.map(({ icon, title, body }) => (
            <div
              key={title}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "26px 24px",
                boxShadow: "0 16px 40px -32px rgba(60,40,25,.4)",
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: "var(--accent-soft)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                }}
              >
                <Icon name={icon} size={22} />
              </span>
              <h3 style={{ fontSize: 23, margin: "16px 0 6px" }}>{title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 15.5 }}>{body}</p>
            </div>
          ))}
        </div>

        <div
          className="reveal offer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: "clamp(20px,3vw,36px)",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 22,
              padding: "clamp(26px,3vw,40px)",
            }}
          >
            <h3 style={{ fontSize: 24, marginBottom: 18 }}>Das ist alles dabei</h3>
            <div
              className="incl-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px 22px",
              }}
            >
              {OFFER_INCLUDED.map((t) => (
                <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      flex: "0 0 auto",
                      borderRadius: 99,
                      background: "var(--accent)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      marginTop: 1,
                    }}
                  >
                    <Icon name="check" size={14} stroke={2.4} />
                  </span>
                  <span style={{ fontWeight: 500, lineHeight: 1.35 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background:
                "linear-gradient(165deg, color-mix(in oklab,var(--accent) 92%,#000) 0%, var(--accent) 100%)",
              color: "#fff",
              borderRadius: 22,
              padding: "clamp(26px,3vw,40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 26px 60px -30px color-mix(in oklab,var(--accent) 80%,transparent)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12.5,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                Komplett-Website
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "clamp(44px,6vw,64px)",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  2.500
                </span>
                <span style={{ fontSize: 24, fontWeight: 500 }}>€</span>
              </div>
              <div style={{ fontSize: 15, opacity: 0.85, marginTop: 6 }}>
                Festpreis, ab — inkl. Texte &amp; Einrichtung.
              </div>
            </div>
            <a
              href="#kontakt"
              className="btn"
              style={{
                background: "#fff",
                color: "var(--accent-deep)",
                marginTop: 28,
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              Unverbindlich anfragen <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

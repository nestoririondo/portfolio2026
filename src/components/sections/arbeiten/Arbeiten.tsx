import { Icon } from "../../ui/Icon";
import { PhysioDesktop } from "../../mockups/PhysioSite";
import { TechChips } from "./CaseParts";
import { ScrollThrough } from "./ScrollThrough";
import { StickyCase } from "./StickyCase";

export function Arbeiten() {
  return (
    <section id="arbeiten" style={{ padding: "clamp(64px,9vw,120px) 0" }}>
      <div className="wrap">
        {/* quiet section identity — the first case is the section opener */}
        <div className="reveal" style={{ marginBottom: "clamp(24px,3.5vw,40px)" }}>
          <span className="eyebrow">Arbeiten</span>
        </div>

        {/* CASE 1 — REB (scroll-through, doubles as the section opener) */}
        <StickyCase />

        {/* CASE 2 — Physio */}
        <div className="reveal">
          <div
            className="case-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px,4vw,56px)",
              alignItems: "start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 6 }}>
                Praxis am Treptower Park
              </h3>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                Physiotherapie · Alt-Treptow · Beispiel-Konzept
              </div>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6 }}>
                Klarer Auftritt mit eingebauter Terminbuchung. Patient:innen
                buchen direkt auf der Website — rund um die Uhr, ohne Telefon.
              </p>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              <div
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: "22px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: "var(--accent-soft)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon name="spark" size={18} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11.5,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    Funktion
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 22,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  Termine buchen, rund um die Uhr
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>
                  Die Buchung ist direkt in die Seite eingebaut — kein fremdes
                  Portal, keine Weiterleitung. Patient:innen sehen freie Zeiten
                  und buchen in unter einer Minute.
                </p>
              </div>
              <TechChips
                items={["Online-Buchung", "Responsive", "Barrierearm", "Google Business"]}
              />
            </div>
          </div>

          <div style={{ marginTop: "clamp(28px,4vw,48px)" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 14,
              }}
            >
              ↓ Scroll dich durch die Seite
            </div>
            <ScrollThrough
              url="praxis-treptowerpark.de"
              stops={[
                { at: 0, label: "Start" },
                { at: 0.34, label: "Online-Buchung" },
                { at: 0.68, label: "Leistungen" },
              ]}
            >
              <PhysioDesktop />
            </ScrollThrough>
          </div>
        </div>
      </div>
    </section>
  );
}

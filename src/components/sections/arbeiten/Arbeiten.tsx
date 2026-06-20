import { Icon } from "../../ui/Icon";
import { TallBrowser } from "../../mockups/Frames";
import { PhysioDesktop } from "../../mockups/PhysioSite";
import { CaseLabel, Showcase, TechChips } from "./CaseParts";
import { StickyCase } from "./StickyCase";

export function Arbeiten() {
  return (
    <section id="arbeiten" style={{ padding: "clamp(50px,7vw,96px) 0" }}>
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 660, marginBottom: 46 }}>
          <span className="eyebrow">Arbeiten</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)", marginTop: 14 }}>
            Echte Kunden, echte Funktion.
          </h2>
        </div>

        {/* CASE 1 — REB (scroll-through) */}
        <StickyCase />

        {/* CASE 2 — Physio */}
        <div className="reveal">
          <CaseLabel n="Fallstudie 02">
            <span className="chip">
              <Icon name="spark" size={14} /> Online-Terminbuchung
            </span>
          </CaseLabel>
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
                Physiotherapie · Alt-Treptow
              </div>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6 }}>
                Klarer Auftritt mit eingebauter Terminbuchung. Patienten buchen
                direkt auf der Website — rund um die Uhr, ohne Telefon.
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

          <Showcase caption="Die neue Website · Vollansicht">
            <TallBrowser url="praxis-treptowerpark.de">
              <PhysioDesktop />
            </TallBrowser>
          </Showcase>
        </div>
      </div>
    </section>
  );
}

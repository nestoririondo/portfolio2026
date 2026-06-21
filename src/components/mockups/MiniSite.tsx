import type { ReactNode } from "react";

/** Browser chrome wrapper for the small before/after site crops. */
function Browser({
  children,
  url,
  dated,
}: {
  children: ReactNode;
  url: string;
  dated?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: dated ? "#e9e9ea" : "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: dated ? "#cfd0d2" : "#f3efe8",
          borderBottom: dated ? "1px solid #b9babd" : "1px solid #ece5d8",
          flex: "0 0 auto",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#e06a5b", "#e8b84b", "#5db469"].map((c, i) => (
            <span
              key={i}
              style={{
                width: 9,
                height: 9,
                borderRadius: 99,
                background: dated ? "#9a9b9e" : c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: dated ? "#6c6d70" : "#9a8f7e",
            background: dated ? "#e4e5e7" : "#fffdf9",
            borderRadius: 6,
            padding: "3px 9px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            border: dated ? "1px solid #bcbdc0" : "1px solid #ece5d8",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/** Dated 2009-era consulting site. */
function MiniBefore() {
  return (
    <Browser url="www.reb-consulting.de" dated>
      <div
        style={{
          fontFamily: "Times New Roman, Georgia, serif",
          color: "#1a1a1a",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "linear-gradient(#2b4a86,#16294f)",
            color: "#fff",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              background: "#c7ced9",
              display: "grid",
              placeItems: "center",
              fontSize: 9,
              color: "#2b4a86",
              fontWeight: 700,
            }}
          >
            REB
          </div>
          <div
            style={{ fontSize: 15, fontWeight: 700, textShadow: "1px 1px 0 #0a1631" }}
          >
            REB Consulting GmbH
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 8,
              fontStyle: "italic",
              color: "#ffd96b",
            }}
          >
            Ihr Partner seit 1998!
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 0,
            background: "#b0152a",
            fontSize: 9.5,
            color: "#fff",
          }}
        >
          {["Startseite", "Leistungen", "Über uns", "Kontakt", "Impressum"].map(
            (x, i) => (
              <span
                key={i}
                style={{
                  padding: "4px 7px",
                  borderRight: "1px solid #80101f",
                  textDecoration: "underline",
                }}
              >
                {x}
              </span>
            ),
          )}
        </div>
        <div style={{ display: "flex", gap: 8, padding: 9, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, fontSize: 8.5, lineHeight: 1.35, color: "#222" }}>
            <div
              style={{
                fontSize: 11,
                color: "#b0152a",
                fontWeight: 700,
                marginBottom: 3,
              }}
            >
              Herzlich Willkommen!
            </div>
            <div style={{ color: "#1c3a7a", textDecoration: "underline" }}>
              » Wir beraten Sie kompetent
            </div>
            <p style={{ margin: "4px 0", color: "#333" }}>
              Wir bieten Ihnen umfassende Beratung im Bereich
              Unternehmens&shy;entwicklung. Klicken Sie hier für mehr...
            </p>
            <div style={{ color: "#1c3a7a", textDecoration: "underline" }}>
              » Mehr erfahren
            </div>
            <div
              style={{
                marginTop: 5,
                background: "#fff8cc",
                border: "1px solid #d9c34a",
                padding: 4,
                fontSize: 7.5,
              }}
            >
              ★ NEU: Newsletter abonnieren!
            </div>
          </div>
          <div
            style={{
              width: 64,
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div
              style={{
                background: "#dfe3ea",
                border: "1px solid #aab2c2",
                padding: 4,
                fontSize: 7,
                textAlign: "center",
                color: "#2b4a86",
              }}
            >
              Besucher: 04217
            </div>
            <div
              style={{
                background: "#dfe3ea",
                border: "1px solid #aab2c2",
                height: 30,
                display: "grid",
                placeItems: "center",
                fontSize: 7,
                color: "#888",
              }}
            >
              [ Banner ]
            </div>
            <div
              style={{
                fontSize: 7,
                color: "#1c3a7a",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Gästebuch
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/** Modern warm consulting site. */
function MiniAfter() {
  return (
    <Browser url="reb-consulting.de" dated={false}>
      <div
        style={{
          fontFamily: "var(--font-body)",
          color: "#2a2520",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fffdf9",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", padding: "9px 13px", gap: 10 }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "-.01em",
            }}
          >
            REB <span style={{ color: "var(--accent)" }}>Consulting</span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 11,
              fontSize: 8.5,
              color: "#6b6258",
            }}
          >
            <span>Leistungen</span>
            <span>Über uns</span>
            <span>Kontakt</span>
            <span
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "3px 8px",
                borderRadius: 999,
              }}
            >
              Termin
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "10px 13px 0",
            flex: 1,
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1.2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 17,
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: "-.015em",
                marginBottom: 5,
              }}
            >
              Strategie, die Ihr Unternehmen{" "}
              <span style={{ color: "var(--accent)" }}>weiterbringt.</span>
            </div>
            <div
              style={{
                fontSize: 8.5,
                color: "#6b6258",
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              Unabhängige Beratung für den Mittelstand — persönlich und auf
              Augenhöhe.
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  padding: "5px 11px",
                  borderRadius: 999,
                  fontSize: 8.5,
                  fontWeight: 600,
                }}
              >
                Erstgespräch
              </span>
              <span
                style={{
                  border: "1px solid #e3dccf",
                  padding: "5px 11px",
                  borderRadius: 999,
                  fontSize: 8.5,
                }}
              >
                Mehr
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: "12px 12px 0 0",
              background: "linear-gradient(160deg,#f0e7da,#e7d8c4)",
              position: "relative",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(194,96,63,.10) 0 2px, transparent 2px 12px)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 6,
                left: 8,
                fontFamily: "var(--mono)",
                fontSize: 7,
                color: "#9a8f7e",
              }}
            >
              foto
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, padding: "8px 13px 10px" }}>
          {["Strategie", "Prozesse", "Förderung"].map((x, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "#f7f1e8",
                border: "1px solid #efe6d7",
                borderRadius: 8,
                padding: "5px 7px",
                fontSize: 8,
                color: "#4a443c",
                fontWeight: 600,
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

/** Rendered (not image) before/after crop of a small business site. */
export function MiniSite({ kind }: { kind: "before" | "after" }) {
  return kind === "before" ? <MiniBefore /> : <MiniAfter />;
}

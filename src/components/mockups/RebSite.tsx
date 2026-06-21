/** REB Consulting — real-estate consultancy mockup (deep green / sand brand). */

const REB = {
  ink: "#1c2b26",
  green: "#1f5d4c",
  greenDeep: "#163f33",
  sand: "#c2a165",
  paper: "#fbfaf6",
  line: "#e7e3d8",
  soft: "#eef2ee",
};

interface Prop {
  t: string;
  loc: string;
  price: string;
  z: string;
  m: string;
  badge: string;
  b: string;
}

const PROPS: Prop[] = [
  { t: "Altbauwohnung mit Stuck", loc: "Prenzlauer Berg", price: "740.000 €", z: "3 Zi", m: "98 m²", badge: "Neu", b: "#1f5d4c" },
  { t: "Loft im Gewerbehof", loc: "Friedrichshain", price: "615.000 €", z: "2 Zi", m: "84 m²", badge: "Neu", b: "#1f5d4c" },
  { t: "Reihenhaus mit Garten", loc: "Treptow-Köpenick", price: "890.000 €", z: "5 Zi", m: "142 m²", badge: "Reserviert", b: "#b07a2b" },
  { t: "Penthouse am Wasser", loc: "Rummelsburg", price: "1.250.000 €", z: "4 Zi", m: "131 m²", badge: "Neu", b: "#1f5d4c" },
  { t: "Sanierte Etagenwohnung", loc: "Charlottenburg", price: "560.000 €", z: "2 Zi", m: "71 m²", badge: "Beliebt", b: "#9a6b3a" },
  { t: "Gewerbeeinheit, Erdgeschoss", loc: "Neukölln", price: "420.000 €", z: "—", m: "96 m²", badge: "Neu", b: "#1f5d4c" },
];

export function PropCard({ p, compact }: { p: Prop; compact?: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${REB.line}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 10px 24px -20px rgba(20,40,30,.5)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: compact ? "16/10" : "16/11",
          background: `linear-gradient(150deg, ${REB.soft}, #dfe7df 60%, #d2ddca)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(31,93,76,.08) 0 2px, transparent 2px 13px)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 9,
            left: 9,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".03em",
            color: "#fff",
            background: p.b,
            padding: "3px 9px",
            borderRadius: 999,
          }}
        >
          {p.badge}
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 9,
            right: 9,
            fontSize: 11.5,
            fontWeight: 700,
            color: REB.ink,
            background: "rgba(255,255,255,.92)",
            padding: "4px 10px",
            borderRadius: 999,
            fontFamily: "var(--mono)",
          }}
        >
          {p.price}
        </span>
      </div>
      <div style={{ padding: "11px 13px 13px", fontFamily: "var(--font-body)" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: REB.ink,
            fontFamily: "var(--font-head)",
          }}
        >
          {p.t}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "#6f7b73",
            margin: "4px 0 9px",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={REB.green} strokeWidth="2">
            <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.2" />
          </svg>
          {p.loc}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 10.5,
            color: "#586b62",
            borderTop: `1px solid ${REB.line}`,
            paddingTop: 9,
          }}
        >
          <span>
            <b style={{ color: REB.ink }}>{p.z}</b>
          </span>
          <span>
            <b style={{ color: REB.ink }}>{p.m}</b>
          </span>
          <span style={{ marginLeft: "auto", color: REB.green, fontWeight: 600 }}>
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}

function RebNav({ mobile }: { mobile?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: mobile ? "11px 14px" : "15px 30px",
        background: "rgba(251,250,246,.9)",
        backdropFilter: "blur(6px)",
        borderBottom: `1px solid ${REB.line}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-head)",
          fontWeight: 600,
          fontSize: mobile ? 14 : 17,
          color: REB.green,
          letterSpacing: "-.01em",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            background: REB.green,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
          }}
        >
          R
        </span>
        REB Consulting
      </div>
      {!mobile && (
        <div
          style={{
            display: "flex",
            gap: 20,
            marginLeft: 18,
            fontSize: 12.5,
            color: REB.ink,
          }}
        >
          {["Immobilien", "Verkaufen", "Bewertung", "Über uns"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      )}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {!mobile && (
          <span style={{ fontSize: 12, color: REB.green, fontWeight: 600 }}>
            030 · 1234 567
          </span>
        )}
        {mobile ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={REB.ink} strokeWidth="2">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        ) : (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              background: REB.green,
              padding: "8px 15px",
              borderRadius: 999,
            }}
          >
            Beratung vereinbaren
          </span>
        )}
      </div>
    </div>
  );
}

function RebHero({ mobile }: { mobile?: boolean }) {
  return (
    <div
      style={{
        padding: mobile ? "22px 16px 26px" : "40px 30px 34px",
        display: mobile ? "block" : "grid",
        gridTemplateColumns: "1.1fr .9fr",
        gap: 30,
        alignItems: "center",
        background: `linear-gradient(180deg, ${REB.paper}, #f4f5ef)`,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: REB.sand,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Immobilienberatung · Berlin &amp; Brandenburg
        </div>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: mobile ? 24 : 36,
            lineHeight: 1.05,
            color: REB.ink,
            fontWeight: 600,
            letterSpacing: "-.02em",
          }}
        >
          Ihre Immobilie in Berlin – in den besten Händen.
        </div>
        <p
          style={{
            fontSize: mobile ? 12.5 : 14,
            color: "#5d6a62",
            margin: "12px 0 0",
            lineHeight: 1.55,
            maxWidth: 420,
          }}
        >
          Persönliche Beratung beim Kauf und Verkauf. Über 25 Jahre
          Markterfahrung, ehrlich und auf Augenhöhe.
        </p>
        <div
          style={{
            marginTop: 18,
            display: mobile ? "grid" : "flex",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            background: "#fff",
            borderRadius: 14,
            padding: 8,
            border: `1px solid ${REB.line}`,
            boxShadow: "0 14px 30px -22px rgba(20,40,30,.5)",
            maxWidth: mobile ? "none" : 470,
          }}
        >
          {["Stadtteil", "Typ", "bis Preis"].slice(0, mobile ? 2 : 3).map((x) => (
            <div
              key={x}
              style={{
                flex: 1,
                fontSize: 11.5,
                color: "#6f7b73",
                padding: "9px 11px",
                borderRadius: 9,
                background: REB.soft,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {x} <span style={{ opacity: 0.5 }}>▾</span>
            </div>
          ))}
          <div
            style={{
              background: REB.green,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "9px 16px",
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              gridColumn: mobile ? "span 2" : "auto",
            }}
          >
            Suchen
          </div>
        </div>
      </div>
      {!mobile && (
        <div
          style={{
            aspectRatio: "5/4",
            borderRadius: 16,
            background: `linear-gradient(155deg, #2a6b58, ${REB.greenDeep})`,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px -30px rgba(20,50,40,.6)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)",
            }}
          />
          <div style={{ position: "absolute", left: 16, bottom: 16, color: "#fff" }}>
            <div style={{ fontSize: 11, opacity: 0.8, fontFamily: "var(--mono)" }}>
              Persönlich betreut von
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 600 }}>
              R. E. Berger
            </div>
          </div>
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontFamily: "var(--mono)",
              fontSize: 9,
              color: "rgba(255,255,255,.55)",
            }}
          >
            foto
          </span>
        </div>
      )}
    </div>
  );
}

function RebStats() {
  const stats: [string, string][] = [
    ["25+", "Jahre Erfahrung"],
    ["200+", "vermittelte Objekte"],
    ["1–2 Tage", "Reaktionszeit"],
    ["4,9 ★", "Google-Bewertung"],
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 0,
        background: REB.greenDeep,
        color: "#fff",
      }}
    >
      {stats.map(([n, l], i) => (
        <div
          key={i}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "16px 8px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,.12)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 21,
              fontWeight: 600,
              color: REB.sand,
            }}
          >
            {n}
          </div>
          <div style={{ fontSize: 10.5, opacity: 0.82, marginTop: 2 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function RebListings({ count = 6, cols }: { count?: number; cols?: number }) {
  return (
    <div style={{ padding: "30px 30px 34px", background: REB.paper }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 18,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 24,
              fontWeight: 600,
              color: REB.ink,
              letterSpacing: "-.01em",
            }}
          >
            Aktuelle Angebote
          </div>
          <div style={{ fontSize: 12, color: "#6f7b73", marginTop: 3 }}>
            Direkt aus unserem Bestand — immer aktuell.
          </div>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            fontWeight: 600,
            color: REB.green,
            background: "#fff",
            border: `1px solid ${REB.line}`,
            padding: "6px 12px",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              background: "#3aa76d",
              boxShadow: "0 0 0 3px rgba(58,167,109,.22)",
            }}
          />
          Live aktualisiert über Propstack
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols || 3}, 1fr)`,
          gap: 16,
        }}
      >
        {PROPS.slice(0, count).map((p, i) => (
          <PropCard key={i} p={p} />
        ))}
      </div>
    </div>
  );
}

function RebFooter() {
  const cols: [string, string[]][] = [
    ["Immobilien", ["Kaufen", "Verkaufen", "Bewertung"]],
    ["Unternehmen", ["Über uns", "Team", "Kontakt"]],
    ["Rechtliches", ["Impressum", "Datenschutz"]],
  ];
  return (
    <div
      style={{
        background: REB.ink,
        color: "rgba(255,255,255,.7)",
        padding: "26px 30px",
        display: "flex",
        gap: 30,
        flexWrap: "wrap",
        fontSize: 11.5,
      }}
    >
      <div style={{ flex: 2, minWidth: 160 }}>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 16,
            color: "#fff",
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          REB Consulting GmbH
        </div>
        <div style={{ lineHeight: 1.7 }}>
          Karl-Marx-Straße 1<br />
          12043 Berlin
        </div>
      </div>
      {cols.map(([h, items]) => (
        <div key={h} style={{ flex: 1, minWidth: 110 }}>
          <div style={{ color: "#fff", fontWeight: 600, marginBottom: 8 }}>{h}</div>
          {items.map((x) => (
            <div key={x} style={{ lineHeight: 1.9 }}>
              {x}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function RebDesktop() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <RebNav />
      <RebHero />
      <RebStats />
      <RebListings count={6} cols={3} />
      <div
        style={{
          background: `linear-gradient(120deg, ${REB.green}, ${REB.greenDeep})`,
          color: "#fff",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 600 }}>
            Sie möchten verkaufen?
          </div>
          <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 5 }}>
            Kostenlose Marktwert­einschätzung in 48 Stunden.
          </div>
        </div>
        <span
          style={{
            background: "#fff",
            color: REB.green,
            fontWeight: 700,
            fontSize: 13,
            padding: "11px 20px",
            borderRadius: 999,
          }}
        >
          Immobilie bewerten
        </span>
      </div>
      <RebFooter />
    </div>
  );
}

export function RebMobile() {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        background: REB.paper,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <RebNav mobile />
      <RebHero mobile />
      <div style={{ padding: "16px 14px 8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 15,
              fontWeight: 600,
              color: REB.ink,
            }}
          >
            Angebote
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 8.5,
              fontWeight: 600,
              color: REB.green,
            }}
          >
            <span
              style={{ width: 5, height: 5, borderRadius: 99, background: "#3aa76d" }}
            />{" "}
            Live · Propstack
          </span>
        </div>
        <div style={{ display: "grid", gap: 11 }}>
          {PROPS.slice(0, 3).map((p, i) => (
            <PropCard key={i} p={p} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

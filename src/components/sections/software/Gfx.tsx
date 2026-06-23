import type { CSSProperties, ReactNode } from "react";
import type { OutcomeGfx } from "../../../data/content";

/** Little browser-window shell that frames each outcome's mini-UI. */
function Screen({
  children,
  w = 268,
  fullWidth = false,
}: {
  children: ReactNode;
  w?: number;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        width: fullWidth ? "100%" : w,
        borderRadius: 14,
        background: "#fffdf9",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,.07)",
        boxShadow:
          "0 34px 58px -22px rgba(0,0,0,.62), 0 6px 16px -8px rgba(0,0,0,.45)",
      }}
    >
      <div
        style={{
          height: 24,
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "0 11px",
          background: "#f6efe5",
          borderBottom: "1px solid #efe6d9",
        }}
      >
        <i style={{ width: 7, height: 7, borderRadius: 9, background: "#e6a890" }} />
        <i style={{ width: 7, height: 7, borderRadius: 9, background: "#e8cf9a" }} />
        <i style={{ width: 7, height: 7, borderRadius: 9, background: "#bcd3b6" }} />
      </div>
      <div
        style={{
          padding: "12px 13px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const Bar = ({ w = "100%", c = "#ece3d7", h = 7 }: { w?: number | string; c?: string; h?: number }) => (
  <div style={{ width: w, height: h, borderRadius: 5, background: c }} />
);

/** The mini-UI for a given outcome. */
export function Gfx({ type, fullWidth }: { type: OutcomeGfx; fullWidth?: boolean }) {
  const A = "var(--accent)";
  const GRN = "#3fa96b";
  const mono: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: ".04em" };

  if (type === "booking")
    return (
      <Screen fullWidth={fullWidth}>
        <div style={{ ...mono, fontSize: 9, color: "#a3978a" }}>FREIE TERMINE</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => {
            const active = d === "Do";
            return (
              <span
                key={d}
                style={{
                  ...mono,
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9.5,
                  padding: "5px 0",
                  borderRadius: 6,
                  color: active ? "#fff" : "#a3978a",
                  background: active ? A : "#f3ece1",
                }}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["09:00", "10:30"].map((t) => (
            <span
              key={t}
              style={{
                ...mono,
                fontSize: 10.5,
                color: A,
                background: "color-mix(in oklab,var(--accent) 12%,#fff)",
                border: "1px solid color-mix(in oklab,var(--accent) 32%,#fff)",
                borderRadius: 7,
                padding: "5px 9px",
              }}
            >
              {t}
            </span>
          ))}
          <span
            style={{
              ...mono,
              fontSize: 10.5,
              color: "#fff",
              background: GRN,
              borderRadius: 7,
              padding: "5px 9px",
              display: "inline-flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 12 9 17 20 6" />
            </svg>
            14:00
          </span>
        </div>
        <div style={{ height: 1, background: "#f0e8dd", margin: "1px 0" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Bar w={64} c="#ece3d7" />
          <span
            style={{
              ...mono,
              fontSize: 10,
              color: "#fff",
              background: A,
              borderRadius: 7,
              padding: "5px 11px",
            }}
          >
            Buchen
          </span>
        </div>
      </Screen>
    );

  if (type === "sync") {
    const StatusChip = ({ label, color }: { label: string; color: string }) => (
      <span
        style={{
          ...mono,
          fontSize: 9,
          color,
          background: `color-mix(in oklab,${color} 14%,#fff)`,
          borderRadius: 6,
          padding: "3px 7px",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          flex: "0 0 auto",
        }}
      >
        <i style={{ width: 5, height: 5, borderRadius: 9, background: color }} />
        {label}
      </span>
    );
    const ListRow = ({
      labelW,
      status,
      color,
      isNew = false,
    }: {
      labelW: string;
      status: string;
      color: string;
      isNew?: boolean;
    }) => (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: "color-mix(in oklab,var(--accent) 16%,#fff)",
            flex: "0 0 auto",
          }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Bar w={labelW} />
            {isNew && (
              <span style={{ ...mono, fontSize: 8, color: A, background: "color-mix(in oklab,var(--accent) 14%,#fff)", borderRadius: 5, padding: "1px 5px" }}>
                neu
              </span>
            )}
          </div>
          <Bar w="48%" c="#f0e8dd" />
        </div>
        <StatusChip label={status} color={color} />
      </div>
    );
    return (
      <Screen fullWidth={fullWidth}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ ...mono, fontSize: 9, color: "#a3978a" }}>VERFÜGBARKEIT</span>
          <span style={{ ...mono, fontSize: 9, color: GRN, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <i style={{ width: 6, height: 6, borderRadius: 9, background: GRN }} />
            LIVE
          </span>
        </div>
        <ListRow labelW="56%" status="frei" color={GRN} isNew />
        <ListRow labelW="68%" status="reserviert" color="#c98a1e" />
        <div style={{ height: 1, background: "#f0e8dd", margin: "1px 0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, ...mono, fontSize: 9.5, color: A }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-2.6-6.4" />
            <polyline points="21 3 21 8 16 8" />
          </svg>
          Automatisch aktualisiert
        </div>
      </Screen>
    );
  }

  if (type === "reviews") {
    const GOLD = "#e8b34a";
    const Stars = ({ n = 5, size = 11 }: { n?: number; size?: number }) => (
      <span style={{ display: "inline-flex", gap: 1.5 }}>
        {Array.from({ length: n }).map((_, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={GOLD}>
            <path d="M12 2l2.6 7.2L22 9.6l-5.6 4.4L18 21l-6-3.9L6 21l1.6-7L2 9.6l7.4-.4z" />
          </svg>
        ))}
      </span>
    );
    return (
      <Screen fullWidth={fullWidth}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ ...mono, fontSize: 9, color: "#a3978a" }}>BEWERTUNGEN</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ ...mono, fontSize: 10.5, color: "#5b5147", fontWeight: 700 }}>4,9</span>
            <Stars size={10} />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            background: "color-mix(in oklab,var(--accent) 9%,#fff)",
            border: "1px solid color-mix(in oklab,var(--accent) 22%,#fff)",
            borderRadius: 9,
            padding: "8px 9px",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              flex: "0 0 auto",
              borderRadius: 9,
              background: A,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-head)",
            }}
          >
            S
          </span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ ...mono, fontSize: 10, color: "#5b5147", fontWeight: 700 }}>Sandra K.</span>
              <Stars size={9} />
            </div>
            <Bar w="92%" c="#efe7db" />
            <Bar w="68%" c="#efe7db" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, ...mono, fontSize: 9.5, color: GRN }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={GRN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 12 9 17 20 6" />
          </svg>
          87 Bewertungen · Google
        </div>
      </Screen>
    );
  }

  const Spark = ({ size = 11, c = "#fff" }: { size?: number; c?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c} style={{ flex: "0 0 auto" }}>
      <path d="M12 2l2.2 6.3L21 10l-5.4 3.7L17 21l-5-3.6L7 21l1.4-7.3L3 10l6.8-1.7z" />
    </svg>
  );
  return (
    <Screen fullWidth={fullWidth}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...mono, fontSize: 9, color: "#a3978a", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Spark size={10} c={A} />
          KI-ASSISTENT
        </span>
        <span style={{ ...mono, fontSize: 9, color: GRN, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <i style={{ width: 6, height: 6, borderRadius: 9, background: GRN }} />
          ONLINE
        </span>
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: "86%",
          background: "#f1e9dd",
          borderRadius: "12px 12px 12px 3px",
          padding: "7px 10px",
          fontSize: 11.5,
          lineHeight: 1.35,
          color: "#6b6055",
        }}
      >
        Was kostet eine Beratung?
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "86%",
          background: A,
          borderRadius: "12px 12px 3px 12px",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11.5,
          lineHeight: 1.35,
          color: "#fff",
        }}
      >
        <Spark size={12} />
        Die erste ist kostenlos 😊 Soll ich einen Termin vorschlagen?
      </div>
      <div style={{ ...mono, fontSize: 9, color: "#a3978a", textAlign: "right" }}>
        Sofort beantwortet
      </div>
    </Screen>
  );
}

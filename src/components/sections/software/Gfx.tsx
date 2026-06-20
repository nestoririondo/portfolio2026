import type { CSSProperties, ReactNode } from "react";
import type { OutcomeGfx } from "../../../data/content";

/** Little browser-window shell that frames each outcome's mini-UI. */
function Screen({ children, w = 222 }: { children: ReactNode; w?: number }) {
  return (
    <div
      style={{
        width: w,
        borderRadius: 16,
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
export function Gfx({ type }: { type: OutcomeGfx }) {
  const A = "var(--accent)";
  const GRN = "#3fa96b";
  const mono: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: ".04em" };

  if (type === "booking")
    return (
      <Screen>
        <div style={{ ...mono, fontSize: 9, color: "#a3978a" }}>FREIE TERMINE · DO</div>
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

  if (type === "chart")
    return (
      <Screen>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Bar w={56} c="#e2d8ca" />
          <span
            style={{
              ...mono,
              fontSize: 9,
              color: GRN,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <i style={{ width: 6, height: 6, borderRadius: 9, background: GRN }} />
            LIVE
          </span>
        </div>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 34,
                height: 26,
                borderRadius: 6,
                background: `color-mix(in oklab,var(--accent) ${i ? 22 : 34}%,#fff)`,
                flex: "0 0 auto",
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <Bar w="80%" />
              <Bar w="52%" c="#f0e8dd" />
            </div>
            <span style={{ ...mono, fontSize: 10, color: A, fontWeight: 600 }}>
              {i ? "320T" : "540T"} €
            </span>
          </div>
        ))}
      </Screen>
    );

  if (type === "inbox")
    return (
      <Screen>
        <div style={{ ...mono, fontSize: 9, color: "#a3978a" }}>POSTEINGANG</div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
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
              borderRadius: 8,
              background: A,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-head)",
            }}
          >
            M
          </span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <Bar w="62%" c="#dccfbe" />
            <Bar w="90%" c="#efe7db" />
          </div>
          <span style={{ width: 8, height: 8, borderRadius: 9, background: GRN, flex: "0 0 auto" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, ...mono, fontSize: 9.5, color: GRN }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={GRN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 12 9 17 20 6" />
          </svg>
          Zugestellt · 1 Min.
        </div>
      </Screen>
    );

  return (
    <Screen>
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: "78%",
          background: "#f1e9dd",
          borderRadius: "12px 12px 12px 3px",
          padding: "7px 9px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Bar w={70} c="#d8cbb9" />
        <Bar w={44} c="#e2d6c6" />
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "82%",
          background: A,
          borderRadius: "12px 12px 3px 12px",
          padding: "7px 9px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <Bar w={64} c="rgba(255,255,255,.9)" />
          <Bar w={40} c="rgba(255,255,255,.6)" />
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2l2.2 6.3L21 10l-5.4 3.7L17 21l-5-3.6L7 21l1.4-7.3L3 10l6.8-1.7z" />
        </svg>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center", ...mono, fontSize: 9, color: "#a3978a" }}>
        <i style={{ width: 5, height: 5, borderRadius: 9, background: A }} />
        <i style={{ width: 5, height: 5, borderRadius: 9, background: "color-mix(in oklab,var(--accent) 55%,#fff)" }} />
        <i style={{ width: 5, height: 5, borderRadius: 9, background: "color-mix(in oklab,var(--accent) 30%,#fff)" }} />
        <span style={{ marginLeft: 3 }}>Assistent antwortet…</span>
      </div>
    </Screen>
  );
}

import type { CSSProperties, ReactNode } from "react";

/** Browser chrome whose content flows tall (full-page screenshots, not crops). */
export function TallBrowser({
  url,
  children,
  style = {},
}: {
  url: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--line)",
        boxShadow:
          "0 40px 90px -40px rgba(60,40,25,.5), 0 6px 16px -10px rgba(60,40,25,.25)",
        background: "#fff",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 13px",
          background: "#efe9df",
          borderBottom: "1px solid #e6dccb",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#e0685a", "#e8b94c", "#5db469"].map((c, i) => (
            <span
              key={i}
              style={{ width: 10, height: 10, borderRadius: 99, background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 360,
            margin: "0 auto",
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "#9a8f7e",
            background: "#fffdf9",
            borderRadius: 7,
            padding: "4px 12px",
            textAlign: "center",
            border: "1px solid #ece5d8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5db469" strokeWidth="3">
            <path d="M6 11V8a6 6 0 0 1 12 0v3" />
            <rect x="4" y="11" width="16" height="10" rx="2" fill="#5db469" stroke="none" />
          </svg>
          {url}
        </div>
        <div style={{ width: 52 }} />
      </div>
      <div className="tall-browser-body">{children}</div>
    </div>
  );
}

/** Phone bezel frame with notch. */
export function PhoneFrame({
  children,
  width = 230,
}: {
  children: ReactNode;
  width?: number;
}) {
  return (
    <div
      style={{
        width,
        borderRadius: width * 0.14,
        padding: width * 0.035,
        background: "#1d1a16",
        boxShadow:
          "0 40px 80px -30px rgba(40,28,18,.6), 0 0 0 1px rgba(0,0,0,.3) inset",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: width * 0.11,
          overflow: "hidden",
          background: "#fff",
          aspectRatio: "9 / 19.3",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "34%",
            height: 18,
            background: "#1d1a16",
            borderRadius: "0 0 12px 12px",
            zIndex: 20,
          }}
        />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

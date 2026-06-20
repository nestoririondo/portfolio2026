import { FOOTER_LEGAL, FOOTER_LINKS } from "../../data/content";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "34px 0" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            fontFamily: "var(--font-head)",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <span
            style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }}
          />{" "}
          Nestor Iriondo
        </div>
        <div style={{ display: "flex", gap: 22, fontSize: 14.5, color: "var(--muted)" }}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
          {FOOTER_LEGAL.map(({ label, href }) => (
            <a key={label} href={href} style={{ opacity: 0.8 }}>
              {label}
            </a>
          ))}
        </div>
        <div
          style={{ fontSize: 13.5, color: "var(--muted)", fontFamily: "var(--mono)" }}
        >
          © 2026 · Berlin
        </div>
      </div>
    </footer>
  );
}

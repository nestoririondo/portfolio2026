import { FOOTER_LEGAL, FOOTER_LINKS } from "../../data/content";

function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="brand-tile"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: "var(--accent)",
        display: "grid",
        placeItems: "center",
        flex: "0 0 auto",
        boxShadow:
          "0 10px 24px -14px color-mix(in oklab, var(--accent) 80%, transparent)",
      }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="var(--paper)">
          <rect x="29.5" y="29" width="6.5" height="42" />
          <rect x="64" y="29" width="6.5" height="42" />
          <polygon points="30,29 43,29 70.5,71 57.5,71" />
          <rect x="25" y="29" width="16" height="3.4" />
          <rect x="25" y="67.6" width="16" height="3.4" />
          <rect x="59" y="29" width="16" height="3.4" />
          <rect x="59" y="67.6" width="16" height="3.4" />
        </g>
      </svg>
    </span>
  );
}

export function Footer() {
  const isHome = window.location.pathname === "/";

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "34px 0",
        background: "color-mix(in oklab, var(--paper) 46%, transparent)",
      }}
    >
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
        <a
          href={isHome ? "#top" : "/"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            fontFamily: "var(--font-head)",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <BrandMark />
          Néstor Iriondo
        </a>
        <div
          className="footer-nav"
          style={{
            display: "flex",
            gap: 18,
            color: "var(--muted)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={isHome ? href : `/${href}`} className="nav-link">
              {label}
            </a>
          ))}
          {FOOTER_LEGAL.map(({ label, href }) => (
            <a key={label} href={href} className="footer-legal-link">
              {label}
            </a>
          ))}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: "var(--muted)",
            fontFamily: "var(--mono)",
          }}
        >
          © 2026 · Berlin
        </div>
      </div>
    </footer>
  );
}

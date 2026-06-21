import { useEffect, useRef, useState } from "react";
import { LANGUAGES, NAV_LINKS, type Language } from "../../data/content";
import { useScrolled } from "../../hooks/useScrolled";

function LangSwitch({
  lang,
  setLang,
}: {
  lang: Language;
  setLang: (l: Language) => void;
}) {
  const activeIndex = LANGUAGES.indexOf(lang);

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${LANGUAGES.length}, 1fr)`,
        padding: 3,
        border: "1px solid var(--line)",
        borderRadius: 999,
        background: "var(--paper)",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden="true"
        className="lang-switch-indicator"
        style={{
          position: "absolute",
          top: 3,
          bottom: 3,
          left: 3,
          width: `calc((100% - 6px) / ${LANGUAGES.length})`,
          borderRadius: 999,
          background: "var(--accent)",
          boxShadow:
            "0 10px 24px -14px color-mix(in oklab, var(--accent) 80%, transparent)",
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {LANGUAGES.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            position: "relative",
            zIndex: 1,
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
            padding: "5px 11px",
            fontFamily: "var(--mono)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: ".04em",
            background: "transparent",
            color: lang === l ? "#fff" : "var(--muted)",
            transition: "color .22s ease",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>("DE");
  const scrolled = useScrolled();
  const headerRef = useRef<HTMLElement>(null);

  // close the mobile menu when clicking/tapping anywhere outside the header,
  // or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 86%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(1.4) blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all .3s ease",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", gap: 18, height: 72 }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-.02em",
            display: "flex",
            alignItems: "center",
            gap: 9,
            whiteSpace: "nowrap",
            flex: "0 0 auto",
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 99,
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          Néstor Iriondo
        </a>
        <nav
          className="desk-nav"
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 30,
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: 15.5,
                color: "var(--muted)",
                fontWeight: 500,
                transition: "color .2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="desk-nav">
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <a
          href="#kontakt"
          className="btn btn-primary desk-nav"
          style={{ padding: "11px 19px", fontSize: 15 }}
        >
          Projekt anfragen
        </a>
        <button
          className="mob-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
          style={{
            display: "none",
            marginLeft: "auto",
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            width: 44,
            height: 44,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <g>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </g>
            ) : (
              <g>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </g>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div
          className="mob-menu"
          style={{
            background: "var(--paper)",
            borderBottom: "1px solid var(--line)",
            padding: "8px 0 16px",
          }}
        >
          <div
            className="wrap"
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "12px 4px",
                  fontSize: 18,
                  fontFamily: "var(--font-head)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
              <LangSwitch lang={lang} setLang={setLang} />
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Projekt anfragen
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { LANGUAGES, NAV_LINKS, type Language } from "../../data/content";
import { useScrolled } from "../../hooks/useScrolled";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_IDS = NAV_LINKS.map((l) => l.href.replace(/^#/, ""));
const HEADER_HIDE_SCROLL_Y = 260;

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
  const [hidden, setHidden] = useState(false);
  const isHome = window.location.pathname === "/";
  const scrolled = useScrolled(24);
  const active = useActiveSection(NAV_IDS);
  const headerRef = useRef<HTMLElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  const clearAutoHide = useCallback(() => {
    if (hideTimerRef.current === null) return;
    window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  }, []);

  const scheduleAutoHide = useCallback(() => {
    clearAutoHide();
    if (open || isInteractingRef.current || window.scrollY <= HEADER_HIDE_SCROLL_Y) return;
    hideTimerRef.current = window.setTimeout(() => {
      if (!isInteractingRef.current && !open && window.scrollY > HEADER_HIDE_SCROLL_Y) {
        setHidden(true);
      }
      hideTimerRef.current = null;
    }, 2200);
  }, [clearAutoHide, open]);

  // auto-hide: slide the nav away when scrolling down, reveal it scrolling up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (open) {
        clearAutoHide();
        setHidden(false);
      } else if (y > last && y > HEADER_HIDE_SCROLL_Y) {
        clearAutoHide();
        setHidden(true);
      } else if (y < last) {
        setHidden(false);
        scheduleAutoHide();
      } else if (y <= HEADER_HIDE_SCROLL_Y) {
        clearAutoHide();
        setHidden(false);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    clearAutoHide,
    open,
    scheduleAutoHide,
  ]);

  useEffect(() => clearAutoHide, [clearAutoHide]);

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
      onMouseEnter={() => {
        isInteractingRef.current = true;
        clearAutoHide();
        setHidden(false);
      }}
      onMouseLeave={() => {
        isInteractingRef.current = false;
        scheduleAutoHide();
      }}
      onFocus={() => {
        isInteractingRef.current = true;
        clearAutoHide();
        setHidden(false);
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        isInteractingRef.current = false;
        scheduleAutoHide();
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 78%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(1.4) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(1.4) blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        // explicit props only — never `all`, so the dropdown menu mounts instantly
        transition:
          "transform .3s ease, background .3s ease, border-color .3s ease, backdrop-filter .3s ease, -webkit-backdrop-filter .3s ease",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", gap: 18, height: 72 }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            if (!isHome) {
              window.location.href = "/";
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", " ");
          }}
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-.02em",
            display: "flex",
            alignItems: "center",
            gap: 11,
            whiteSpace: "nowrap",
            flex: "0 0 auto",
          }}
        >
          <span
            className="brand-tile"
            aria-hidden="true"
            style={{
              width: 30,
              height: 30,
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
              width="18"
              height="18"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="var(--paper)">
                {/* left stem */}
                <rect x="29.5" y="29" width="6.5" height="42" />
                {/* right stem */}
                <rect x="64" y="29" width="6.5" height="42" />
                {/* thick diagonal */}
                <polygon points="30,29 43,29 70.5,71 57.5,71" />
                {/* serifs */}
                <rect x="25" y="29" width="16" height="3.4" />
                <rect x="25" y="67.6" width="16" height="3.4" />
                <rect x="59" y="29" width="16" height="3.4" />
                <rect x="59" y="67.6" width="16" height="3.4" />
              </g>
            </svg>
          </span>
          Néstor Iriondo
        </a>
        <nav
          className="desk-nav"
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 26,
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={isHome ? href : `/${href}`}
              className="nav-link"
              data-active={active === href.replace(/^#/, "") || undefined}
              style={{
                position: "relative",
                fontFamily: "var(--mono)",
                fontSize: 12.5,
                fontWeight: 500,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                paddingBottom: 3,
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="desk-nav">
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <a
          href={isHome ? "#kontakt" : "/#kontakt"}
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
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--paper)",
            borderBottom: "1px solid var(--line)",
            boxShadow: "0 24px 40px -28px rgba(60,40,25,.5)",
            padding: "8px 0 16px",
          }}
        >
          <div
            className="wrap"
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href.replace(/^#/, "");
              return (
                <a
                  key={href}
                  href={isHome ? href : `/${href}`}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "12px 4px",
                    fontSize: 18,
                    fontFamily: "var(--font-head)",
                    color: isActive ? "var(--accent)" : undefined,
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {label}
                </a>
              );
            })}
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
              <LangSwitch lang={lang} setLang={setLang} />
              <a
                href={isHome ? "#kontakt" : "/#kontakt"}
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

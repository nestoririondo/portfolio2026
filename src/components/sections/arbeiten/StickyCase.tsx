import { useEffect, useRef, useState } from "react";
import { REB_CHAPTERS } from "../../../data/content";
import { Icon } from "../../ui/Icon";
import { MiniSite } from "../../mockups/MiniSite";
import { TallBrowser, PhoneFrame } from "../../mockups/Frames";
import { RebDesktop, RebMobile } from "../../mockups/RebSite";
import { CaseLabel, ShotFrame, TechChips } from "./CaseParts";

/**
 * Scroll-through case study: the narrative pins on the left while the shots
 * scroll past on the right. The active chapter tracks whichever shot sits in
 * the vertical center of the viewport.
 */
export function StickyCase() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = wrapRef.current?.querySelectorAll("[data-idx]");
    if (!nodes) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number(e.target.getAttribute("data-idx")));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="reveal" style={{ marginBottom: "clamp(64px,9vw,120px)" }}>
      <CaseLabel n="Fallstudie 01">
        <span
          className="chip"
          style={{
            background: "var(--accent-soft)",
            borderColor: "color-mix(in oklab,var(--accent) 22%,var(--line))",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          <Icon name="star" size={14} /> Echter Kunde
        </span>
      </CaseLabel>
      <div
        ref={wrapRef}
        className="case-sticky"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px,.9fr) minmax(0,1.1fr)",
          gap: "clamp(28px,5vw,68px)",
          alignItems: "start",
        }}
      >
        {/* pinned narrative */}
        <div
          className="case-left"
          style={{ position: "sticky", top: 100, alignSelf: "start" }}
        >
          <h3 style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 6 }}>
            REB Consulting GmbH
          </h3>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--muted)",
              marginBottom: 22,
            }}
          >
            Immobilienberatung · reb-consulting.de
          </div>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink)",
              lineHeight: 1.55,
              marginBottom: 24,
            }}
          >
            Die Website zieht ihre Immobilien live aus der Maklersoftware — keine
            manuellen Updates, keine veralteten Listings.
          </p>
          <div style={{ display: "grid", gap: 0 }}>
            {REB_CHAPTERS.map((c, i) => {
              const on = active === i;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 15,
                    padding: "14px 0",
                    borderTop: i ? "1px solid var(--line)" : "none",
                    opacity: on ? 1 : 0.4,
                    transition: "opacity .35s ease",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: 28,
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: on ? "var(--accent)" : "var(--muted)",
                      transition: "color .3s",
                    }}
                  >
                    {c.k}
                  </span>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: on ? "var(--accent)" : "var(--muted)",
                          transition: "color .3s",
                        }}
                      >
                        {c.label}
                      </span>
                      {on && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 99,
                            background: "var(--accent)",
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontWeight: 500,
                        fontSize: 21,
                        marginBottom: 5,
                      }}
                    >
                      {c.title}
                    </div>
                    <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.5 }}>
                      {c.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            <TechChips
              items={["Propstack-API", "Live-Daten", "Responsive", "Kontaktformular"]}
            />
          </div>
        </div>

        {/* scrolling shots */}
        <div style={{ minWidth: 0 }}>
          <div data-idx="0">
            <ShotFrame label="Vorher · 2009" plain>
              <MiniSite kind="before" />
            </ShotFrame>
          </div>
          <div data-idx="1">
            <ShotFrame label="Jetzt · live über Propstack">
              <TallBrowser url="reb-consulting.de">
                <RebDesktop />
              </TallBrowser>
            </ShotFrame>
          </div>
          <div data-idx="2">
            <ShotFrame label="Mobil · immer aktuell">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PhoneFrame width={224}>
                  <RebMobile />
                </PhoneFrame>
              </div>
            </ShotFrame>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Fragment } from "react";
import { useI18n } from "../../i18n";

/**
 * Custom software product screenshots. Kept as ready-to-use showcase pieces
 * (not currently mounted on the page).
 */

/* KomPass — team competency / skills-gap tool. Indigo-slate product brand. */
const KP = {
  ink: "#1e2433",
  slate: "#5b6478",
  indigo: "#4f46e5",
  indigoSoft: "#eceafe",
  line: "#e7e9f0",
  paper: "#ffffff",
  bg: "#f6f7fb",
  side: "#1b2030",
  lv: ["#f1f2f6", "#dfe7fb", "#b9c6f6", "#8497ee", "#4f46e5"],
};

interface Member {
  n: string;
  r: string;
  lv: number[];
}

const TEAM_LEVELS = [
  [4, 4, 3, 2, 4, 1],
  [4, 3, 1, 4, 2, 0],
  [2, 4, 4, 1, 3, 2],
  [1, 2, 4, 0, 4, 3],
  [2, 3, 4, 1, 2, 4],
  [3, 1, 2, 2, 1, 0],
];

const avatarColor = (i: number) =>
  ["#4f46e5", "#0ea5a3", "#e0683a", "#9333ea", "#0284c7", "#65a30d"][i % 6];

export function KompassApp() {
  const { t } = useI18n();
  const copy = t.mockups.softwareApps;
  const team: Member[] = copy.team.map((member, i) => ({
    ...member,
    lv: TEAM_LEVELS[i],
  }));
  const initials = (n: string) =>
    n
      .split(" ")
      .map((w) => w[0])
      .join("");
  const nav: [string, number][] = [
    [copy.overview, 0],
    [copy.matrix, 1],
    [copy.teamLabel, 0],
    [copy.reports, 0],
    [copy.settings, 0],
  ];
  const stats: [string, string, string][] = [
    ["12", copy.employees, KP.indigo],
    ["6", copy.competencies, "#0ea5a3"],
    ["3", copy.criticalGaps, "#e0683a"],
    ["78%", copy.coverage, "#65a30d"],
  ];
  const gaps: [string, string][] = [
    [copy.accounting, copy.onePerson],
    [copy.development, copy.outageRisk],
    [copy.sales, copy.juniorMissing],
  ];
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        background: KP.bg,
        display: "flex",
        minHeight: 420,
      }}
    >
      {/* sidebar */}
      <div
        style={{
          width: 168,
          background: KP.side,
          color: "rgba(255,255,255,.62)",
          padding: "16px 12px",
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "2px 6px 18px",
            color: "#fff",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: KP.indigo,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7l2.5 5L12 17l-2.5-5z" fill="#fff" stroke="none" />
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15 }}>
            KomPass
          </span>
        </div>
        {nav.map(([t, active], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 8,
              marginBottom: 2,
              fontSize: 12.5,
              fontWeight: active ? 600 : 500,
              color: active ? "#fff" : "rgba(255,255,255,.6)",
              background: active ? "rgba(255,255,255,.08)" : "transparent",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                background: active ? KP.indigo : "rgba(255,255,255,.3)",
              }}
            />
            {t}
          </div>
        ))}
      </div>

      {/* main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "13px 22px",
            background: "#fff",
            borderBottom: `1px solid ${KP.line}`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 16,
                fontWeight: 700,
                color: KP.ink,
              }}
            >
              {copy.matrix}
            </div>
            <div style={{ fontSize: 11, color: KP.slate }}>
              {copy.teamDate}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: KP.slate,
                border: `1px solid ${KP.line}`,
                padding: "7px 12px",
                borderRadius: 8,
                background: "#fff",
              }}
            >
              Exportieren
            </span>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "#fff",
                background: KP.indigo,
                padding: "7px 14px",
                borderRadius: 8,
              }}
            >
              + Bewertung
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flex: 1,
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}
          >
            {stats.map(([n, l, c], i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: `1px solid ${KP.line}`,
                  borderRadius: 11,
                  padding: "13px 15px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: c,
                  }}
                >
                  {n}
                </div>
                <div style={{ fontSize: 11, color: KP.slate, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px",
              gap: 14,
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: `1px solid ${KP.line}`,
                borderRadius: 12,
                padding: "14px 16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "132px repeat(6, 1fr)",
                  gap: 5,
                  marginBottom: 7,
                }}
              >
                <div />
                {copy.skills.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 9,
                      color: KP.slate,
                      fontWeight: 600,
                      textAlign: "center",
                      lineHeight: 1.1,
                      height: 30,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
              {team.map((m, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "132px repeat(6, 1fr)",
                    gap: 5,
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 99,
                        background: avatarColor(ri),
                        color: "#fff",
                        fontSize: 9.5,
                        fontWeight: 700,
                        display: "grid",
                        placeItems: "center",
                        flex: "0 0 auto",
                      }}
                    >
                      {initials(m.n)}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: KP.ink,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {m.n}
                      </span>
                      <span style={{ display: "block", fontSize: 9.5, color: KP.slate }}>
                        {m.r}
                      </span>
                    </span>
                  </div>
                  {m.lv.map((v, ci) => (
                    <div
                      key={ci}
                      style={{
                        height: 30,
                        borderRadius: 7,
                        background: KP.lv[v],
                        display: "grid",
                        placeItems: "center",
                        position: "relative",
                        border: v === 0 ? "1px dashed #d6584a" : "1px solid transparent",
                      }}
                    >
                      {v === 0 ? (
                        <span style={{ fontSize: 11, color: "#d6584a", fontWeight: 800 }}>
                          !
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: v >= 3 ? "#fff" : KP.slate,
                          }}
                        >
                          {v}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 11,
                  fontSize: 9.5,
                  color: KP.slate,
                }}
              >
                <span>{copy.level}</span>
                {KP.lv.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: 16,
                      height: 10,
                      borderRadius: 3,
                      background: c,
                      border: i === 0 ? `1px solid ${KP.line}` : "none",
                    }}
                  />
                ))}
                <span>{copy.expert}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 3,
                      border: "1px dashed #d6584a",
                      display: "grid",
                      placeItems: "center",
                      color: "#d6584a",
                      fontSize: 8,
                      fontWeight: 800,
                    }}
                  >
                    !
                  </span>{" "}
                  Lücke
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  background: "#fff7f4",
                  border: "1px solid #f4d3c8",
                  borderRadius: 12,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#c2502f",
                    marginBottom: 8,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.8 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.8a2 2 0 0 0-3.4 0z" />
                  </svg>
                  Erkannte Lücken
                </div>
                {gaps.map(([t, d], i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 11,
                      color: KP.ink,
                      padding: "6px 0",
                      borderTop: i ? "1px solid #f4ddd4" : "none",
                    }}
                  >
                    <b>{t}</b>
                    <span style={{ color: KP.slate }}> — {d}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#fff",
                  border: `1px solid ${KP.line}`,
                  borderRadius: 12,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: KP.ink,
                    marginBottom: 9,
                  }}
                >
                  {copy.recommendation}
                </div>
                <div style={{ fontSize: 11, color: KP.slate, lineHeight: 1.5 }}>
                  {copy.recommendationBody}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    color: KP.indigo,
                  }}
                >
                  Maßnahme planen →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* DispatchApp — small secondary tool (Dienstplan / scheduling). */
export function DispatchApp() {
  const { t } = useI18n();
  const copy = t.mockups.softwareApps;
  const D = { ink: "#1e2433", line: "#e7e9f0", teal: "#0e8f8a", slate: "#5b6478" };
  const rows = [
    { n: "Anna", c: [1, 1, 0, 2, 1] },
    { n: "Tomáš", c: [2, 0, 1, 1, 0] },
    { n: "Leyla", c: [0, 2, 2, 0, 1] },
    { n: "Jonas", c: [1, 1, 0, 1, 2] },
  ];
  const shifts: [string, string][] = [
    ["#0e8f8a", copy.early],
    ["#e0a042", copy.late],
    ["#cbd2dd", copy.free],
  ];
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "#fff", padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: D.teal,
            display: "grid",
            placeItems: "center",
            color: "#fff",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M3 9h18M8 2v4M16 2v4" />
          </svg>
        </span>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 700, color: D.ink }}>
            {copy.roster}
          </div>
          <div style={{ fontSize: 10.5, color: D.slate }}>{copy.week}</div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10.5,
            fontWeight: 600,
            color: "#fff",
            background: D.teal,
            padding: "6px 11px",
            borderRadius: 7,
          }}
        >
          Veröffentlichen
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "64px repeat(5,1fr)", gap: 5 }}>
        <div />
        {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => (
          <div
            key={d}
            style={{ textAlign: "center", fontSize: 10, color: D.slate, fontWeight: 600 }}
          >
            {d}
          </div>
        ))}
        {rows.map((r, ri) => (
          <Fragment key={ri}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 11.5,
                fontWeight: 600,
                color: D.ink,
              }}
            >
              {r.n}
            </div>
            {r.c.map((s, ci) => (
              <div
                key={ci}
                style={{
                  height: 30,
                  borderRadius: 7,
                  background: shifts[s][0],
                  opacity: s === 2 ? 0.5 : 1,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: s === 2 ? D.slate : "#fff",
                }}
              >
                {shifts[s][1]}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

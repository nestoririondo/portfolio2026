/** Praxis am Treptower Park — physiotherapy mockup (teal-blue brand). */

const PX = {
  ink: "#16323a",
  blue: "#2f7186",
  blueDeep: "#1c4e5e",
  sky: "#eaf3f5",
  line: "#dfeaec",
  paper: "#f8fbfb",
  warm: "#e9b04e",
};

export function PhysioDesktop() {
  const services: [string, string][] = [
    ["Physiotherapie", "Manuelle Therapie & Krankengymnastik"],
    ["Osteopathie", "Ganzheitliche Behandlung"],
    ["Massage", "Klassisch & medizinisch"],
    ["Prävention", "Kurse & Rückenschule"],
  ];
  const days: [string, string][] = [
    ["Mo", "11"],
    ["Di", "12"],
    ["Mi", "13"],
    ["Do", "14"],
    ["Fr", "15"],
  ];
  const slots = ["08:30", "09:15", "10:00", "11:30", "14:00", "15:45"];
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "15px 30px",
          background: "rgba(248,251,251,.92)",
          borderBottom: `1px solid ${PX.line}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 600,
            fontSize: 17,
            color: PX.blue,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 99,
              background: PX.blue,
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
              <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
            </svg>
          </span>
          Praxis am Treptower Park
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginLeft: 18,
            fontSize: 12.5,
            color: PX.ink,
          }}
        >
          {["Leistungen", "Team", "Anfahrt"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            background: PX.warm,
            padding: "8px 15px",
            borderRadius: 999,
          }}
        >
          Termin buchen
        </span>
      </div>
      {/* hero */}
      <div
        style={{
          padding: "40px 30px",
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 28,
          alignItems: "center",
          background: `linear-gradient(170deg, ${PX.paper}, ${PX.sky})`,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: PX.blue,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Physiotherapie in Alt-Treptow
          </div>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 34,
              lineHeight: 1.06,
              color: PX.ink,
              fontWeight: 600,
              letterSpacing: "-.02em",
            }}
          >
            Beweglich bleiben.
            <br />
            Ohne lange Wartezeit.
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#52666c",
              margin: "12px 0 18px",
              lineHeight: 1.55,
              maxWidth: 380,
            }}
          >
            Buchen Sie Ihren Termin online — in unter einer Minute, rund um die
            Uhr.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                background: PX.warm,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                padding: "11px 18px",
                borderRadius: 999,
              }}
            >
              Termin online buchen
            </span>
            <span
              style={{
                border: `1px solid ${PX.line}`,
                color: PX.ink,
                fontWeight: 600,
                fontSize: 13,
                padding: "11px 18px",
                borderRadius: 999,
                background: "#fff",
              }}
            >
              Rückruf anfragen
            </span>
          </div>
        </div>
        {/* booking widget */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${PX.line}`,
            padding: 16,
            boxShadow: "0 26px 50px -30px rgba(20,60,70,.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: PX.ink }}>
              Freie Termine
            </div>
            <div style={{ fontSize: 11, color: PX.blue, fontWeight: 600 }}>
              März 2026 ▾
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {days.map(([d, n], i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "7px 0",
                  borderRadius: 9,
                  background: i === 2 ? PX.blue : PX.sky,
                  color: i === 2 ? "#fff" : PX.ink,
                }}
              >
                <div style={{ fontSize: 9, opacity: 0.7 }}>{d}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{n}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 6,
            }}
          >
            {slots.map((t, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "8px 0",
                  borderRadius: 8,
                  border: `1px solid ${i === 1 ? PX.warm : PX.line}`,
                  background: i === 1 ? "#fff7ea" : "#fff",
                  color: i === 1 ? "#a9701a" : PX.ink,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* services */}
      <div style={{ padding: "30px", background: PX.paper }}>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 22,
            fontWeight: 600,
            color: PX.ink,
            marginBottom: 16,
          }}
        >
          Unsere Leistungen
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
          }}
        >
          {services.map(([t, d], i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: `1px solid ${PX.line}`,
                borderRadius: 12,
                padding: "16px 14px",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: PX.sky,
                  display: "grid",
                  placeItems: "center",
                  color: PX.blue,
                  marginBottom: 10,
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: PX.ink,
                  fontFamily: "var(--font-head)",
                }}
              >
                {t}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6a7d82",
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: PX.blueDeep,
          color: "rgba(255,255,255,.75)",
          padding: "24px 30px",
          fontSize: 11.5,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-head)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Praxis am Treptower Park
        </div>
        <div>Mo–Fr 08:00–19:00 · Puschkinallee 12, 12435 Berlin</div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useI18n } from "../../i18n";

type CardVariant = "reb" | "rest" | "med";

/** Compact abstract before/after mock for example cards. */
function CardMock({ kind, variant }: { kind: "before" | "after"; variant: CardVariant }) {
  const { t } = useI18n();
  const copy = t.mockups.flip;
  if (kind === "before") {
    return (
      <div
        style={{
          height: "100%",
          fontFamily: "Times New Roman, serif",
          background: "#ededee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background:
              variant === "rest" ? "#5a3a1f" : variant === "med" ? "#1f5a6b" : "#7a1f2b",
            color: "#fff",
            padding: "7px 9px",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              background: "#ffffff55",
              display: "grid",
              placeItems: "center",
              fontSize: 8,
            }}
          >
            LOGO
          </span>
          {variant === "rest"
            ? copy.beforeNames.rest
            : variant === "med"
              ? copy.beforeNames.med
              : copy.beforeNames.reb}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 7,
              fontStyle: "italic",
              color: "#ffd96b",
            }}
          >
            {copy.blink}
          </span>
        </div>
        <div
          style={{ display: "flex", fontSize: 8, color: "#fff", background: "#444" }}
        >
          {copy.nav.map((x, i) => (
            <span
              key={i}
              style={{
                padding: "3px 6px",
                textDecoration: "underline",
                borderRight: "1px solid #666",
              }}
            >
              {x}
            </span>
          ))}
        </div>
        <div style={{ padding: 8, fontSize: 8, color: "#222", lineHeight: 1.4, flex: 1 }}>
          <div
            style={{ color: "#1c3a7a", textDecoration: "underline", marginBottom: 3 }}
          >
            {copy.welcome}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <p style={{ margin: 0, flex: 1, color: "#333" }}>
              {copy.body}
            </p>
            <div
              style={{
                width: 38,
                height: 30,
                background: "#cfd3da",
                border: "1px solid #aab",
                display: "grid",
                placeItems: "center",
                fontSize: 6,
                color: "#778",
              }}
            >
              {copy.image}
            </div>
          </div>
          <div
            style={{
              marginTop: 5,
              background: "#fff7cc",
              border: "1px solid #d8c24a",
              padding: 3,
              fontSize: 6.5,
            }}
          >
            {copy.hours}
          </div>
        </div>
      </div>
    );
  }
  const theme =
    variant === "rest"
      ? {
          grad: "linear-gradient(150deg,#efe2d2,#e6cfae)",
          name: copy.after.rest.name,
          tag: copy.after.rest.tag,
          h: copy.after.rest.headline,
        }
      : variant === "med"
        ? {
            grad: "linear-gradient(150deg,#e7ece9,#cfe0d8)",
            name: copy.after.med.name,
            tag: copy.after.med.tag,
            h: copy.after.med.headline,
          }
        : {
            grad: "linear-gradient(150deg,#f1e8d8,#ecd9bd)",
            name: copy.after.reb.name,
            tag: copy.after.reb.tag,
            h: copy.after.reb.headline,
          };
  return (
    <div
      style={{
        height: "100%",
        fontFamily: "var(--font-body)",
        background: "#fffdf9",
        color: "#2a2520",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", padding: "7px 11px", gap: 8 }}
      >
        <span style={{ fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 600 }}>
          {theme.name}
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 7,
            fontSize: 7.5,
            color: "#6b6258",
            alignItems: "center",
          }}
        >
          <span>{copy.menu}</span>
          <span>{copy.contact}</span>
          <span
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "2px 7px",
              borderRadius: 999,
            }}
          >
            {copy.reserve}
          </span>
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 9,
          padding: "4px 11px 9px",
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1.1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 7,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 3,
            }}
          >
            {theme.tag}
          </div>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 14,
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: "-.01em",
            }}
          >
            {theme.h}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            borderRadius: 9,
            background: theme.grad,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(194,96,63,.10) 0 2px, transparent 2px 11px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Example card with a before/after toggle. Kept as a ready-to-use showcase
 * piece (not currently mounted on the page).
 */
export function FlipCard({
  title,
  tag,
  accentName,
}: {
  title: string;
  tag: string;
  accentName: CardVariant;
}) {
  const [show, setShow] = useState<"before" | "after">("after");
  return (
    <div
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 18px 40px -30px rgba(60,40,25,.35)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 11",
          overflow: "hidden",
          background: "#efe7da",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: show === "after" ? 1 : 0,
            transition: "opacity .35s ease",
          }}
        >
          <CardMock kind="after" variant={accentName} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: show === "before" ? 1 : 0,
            transition: "opacity .35s ease",
          }}
        >
          <CardMock kind="before" variant={accentName} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "inline-flex",
            background: "rgba(255,253,249,.9)",
            border: "1px solid var(--line)",
            borderRadius: 999,
            padding: 3,
            gap: 2,
            zIndex: 3,
            backdropFilter: "blur(3px)",
          }}
        >
          {(["before", "after"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setShow(k)}
              style={{
                border: "none",
                cursor: "pointer",
                borderRadius: 999,
                padding: "4px 11px",
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: ".04em",
                fontWeight: 600,
                background: show === k ? "var(--accent)" : "transparent",
                color: show === k ? "#fff" : "var(--muted)",
                transition: "all .2s",
              }}
            >
              {k === "before" ? "Vorher" : "Nachher"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 6,
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: "-.01em",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/** Numbered label with a rule, e.g. "Fallstudie 01 ——— [chip]". */
export function CaseLabel({ n, children }: { n: string; children?: ReactNode }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--accent)",
          letterSpacing: ".08em",
        }}
      >
        {n}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
      {children}
    </div>
  );
}

/** Mono pill row of technologies / features. */
export function TechChips({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((x) => (
        <span
          key={x}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--muted)",
            background: "var(--paper)",
            border: "1px solid var(--line)",
            padding: "7px 12px",
            borderRadius: 999,
          }}
        >
          {x}
        </span>
      ))}
    </div>
  );
}

/** Tinted panel that frames a full mockup, with an optional floating phone. */
export function Showcase({
  children,
  caption,
  phone,
}: {
  children: ReactNode;
  caption?: string;
  phone?: ReactNode;
}) {
  return (
    <div
      className="showcase"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, var(--accent-tint), var(--bg))",
        border: "1px solid var(--line)",
        borderRadius: 24,
        padding: "clamp(20px,3vw,40px)",
        marginTop: 30,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {caption && (
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {caption}
          </div>
        )}
        {children}
      </div>
      {phone && (
        <div
          className="showcase-phone"
          style={{ position: "absolute", right: "clamp(8px,3vw,38px)", bottom: -26 }}
        >
          {phone}
        </div>
      )}
    </div>
  );
}

/** A single scroll-through shot with an optional mono label. */
export function ShotFrame({
  label,
  children,
  plain,
}: {
  label?: string;
  children: ReactNode;
  plain?: boolean;
}) {
  return (
    <div className="case-shot" style={{ marginBottom: "clamp(28px,6vh,72px)" }}>
      {label && (
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11.5,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 12,
          }}
        >
          {label}
        </div>
      )}
      {plain ? (
        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid var(--line)",
            aspectRatio: "16/11",
            boxShadow: "0 30px 64px -40px rgba(60,40,25,.5)",
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

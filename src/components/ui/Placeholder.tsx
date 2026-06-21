import type { CSSProperties } from "react";

interface PlaceholderProps {
  label: string;
  ratio?: string;
  round?: number;
  style?: CSSProperties;
}

/** Striped, labelled stand-in for a photo that hasn't been shot yet. */
export function Placeholder({
  label,
  ratio = "1 / 1",
  round = 18,
  style = {},
}: PlaceholderProps) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: ratio,
        width: "100%",
        borderRadius: round,
        overflow: "hidden",
        background: "var(--ph-bg)",
        backgroundImage:
          "repeating-linear-gradient(135deg, color-mix(in oklab, var(--accent) 8%, transparent) 0 2px, transparent 2px 11px)",
        border: "1px solid var(--line)",
        display: "grid",
        placeItems: "center",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11.5,
          letterSpacing: ".06em",
          color: "color-mix(in oklab, var(--ink) 52%, transparent)",
          textTransform: "uppercase",
          padding: "4px 10px",
          background: "color-mix(in oklab, var(--paper) 78%, transparent)",
          borderRadius: 999,
          border: "1px solid var(--line)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

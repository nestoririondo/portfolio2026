import type { CSSProperties, ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  /** Light-on-dark variant (used by the Software section). */
  onDark?: boolean;
  maxWidth?: number;
  style?: CSSProperties;
}

/**
 * Consistent section header: eyebrow → big headline → short sub, with generous
 * spacing. Keeps every section on the same scriptable rhythm so the whole page
 * reads big-and-scannable.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  onDark = false,
  maxWidth = 760,
  style,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      style={{
        textAlign: center ? "center" : "left",
        maxWidth,
        marginLeft: center ? "auto" : undefined,
        marginRight: center ? "auto" : undefined,
        marginBottom: "clamp(40px,6vw,68px)",
        ...style,
      }}
    >
      <span
        className="eyebrow"
        style={{
          justifyContent: center ? "center" : "flex-start",
          ...(onDark ? { color: "color-mix(in oklab,var(--accent) 60%,#fff)" } : null),
        }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontSize: "clamp(34px,5vw,58px)",
          marginTop: 18,
          letterSpacing: "-.02em",
          ...(onDark ? { color: "#fff" } : null),
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: "clamp(17px,1.4vw,20px)",
            color: onDark ? "rgba(255,255,255,.62)" : "var(--muted)",
            marginTop: 18,
            maxWidth: center ? 600 : 560,
            marginLeft: center ? "auto" : 0,
            marginRight: center ? "auto" : 0,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

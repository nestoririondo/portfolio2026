import type { CSSProperties } from "react";

/** Hand-drawn underline that draws itself in when its `.reveal` ancestor enters view. */
export function Squiggle({
  color = "var(--accent2)",
  style,
}: {
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className="squiggle"
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3 9 C 26 2, 48 2, 70 8 S 116 16, 140 9 S 182 2, 197 6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Soft organic blob shape for background accents. */
export function Blob({
  color = "color-mix(in oklab,var(--accent2) 20%,transparent)",
  style,
  className,
}: {
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <path
        fill={color}
        d="M48,-67C61,-58,69,-42,73,-26C76,-9,75,9,68,24C61,40,49,53,34,62C18,71,-1,76,-19,72C-37,68,-54,55,-65,39C-75,22,-79,1,-75,-18C-71,-37,-58,-53,-43,-63C-27,-73,-9,-76,5,-78C19,-80,35,-77,48,-67Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** Grid of dots for texture. */
export function DotGrid({
  rows = 4,
  cols = 6,
  gap = 15,
  r = 2.3,
  color = "color-mix(in oklab,var(--accent2) 55%,transparent)",
  style,
}: {
  rows?: number;
  cols?: number;
  gap?: number;
  r?: number;
  color?: string;
  style?: CSSProperties;
}) {
  const w = (cols - 1) * gap;
  const h = (rows - 1) * gap;
  const dots = [];
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      dots.push(<circle key={`${x}-${y}`} cx={x * gap} cy={y * gap} r={r} fill={color} />);
  return (
    <svg
      width={w + 2 * r}
      height={h + 2 * r}
      viewBox={`${-r} ${-r} ${w + 2 * r} ${h + 2 * r}`}
      style={style}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

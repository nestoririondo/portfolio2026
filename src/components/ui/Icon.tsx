import type { JSX } from "react";

export type IconName =
  | "check"
  | "arrow"
  | "mail"
  | "phone"
  | "whatsapp"
  | "pin"
  | "globe"
  | "phoneDevice"
  | "layout"
  | "pen"
  | "search"
  | "spark"
  | "star"
  | "quote";

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  color?: string;
}

/** Thin, warm line icons drawn inline. */
export function Icon({
  name,
  size = 22,
  stroke = 1.6,
  color = "currentColor",
}: IconProps) {
  const paths: Record<IconName, JSX.Element> = {
    check: <polyline points="4 12 9 17 20 6" />,
    arrow: (
      <g>
        <line x1="4" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
      </g>
    ),
    mail: (
      <g>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3.5 7 12 13 20.5 7" />
      </g>
    ),
    phone: (
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 4.5 6 1.5 1.5 0 0 1 5 4z" />
    ),
    whatsapp: (
      <g>
        <path d="M3.5 20.5l1.3-3.8A8 8 0 1 1 7.8 19.1z" />
        <path d="M9.3 8.9c.15-.3.3-.3.5-.3h.4c.15 0 .3 0 .45.35l.6 1.3c.05.15 0 .3-.1.4l-.35.4c-.1.1-.1.25 0 .4.4.75 1.15 1.45 1.95 1.75.15.05.3 0 .4-.1l.4-.5c.1-.15.25-.15.4-.1l1.25.6c.15.1.25.2.25.35 0 .55-.45 1.1-.95 1.2-.5.1-1 .1-2.5-.55-1.85-.85-2.9-2.8-3-3-.1-.2-.65-.85-.65-1.7s.4-1.15.55-1.35z" />
      </g>
    ),
    pin: (
      <g>
        <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </g>
    ),
    globe: (
      <g>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" />
      </g>
    ),
    phoneDevice: (
      <g>
        <rect x="7" y="3" width="10" height="18" rx="2.2" />
        <line x1="10.5" y1="18" x2="13.5" y2="18" />
      </g>
    ),
    layout: (
      <g>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="9" x2="9" y2="20" />
      </g>
    ),
    pen: (
      <g>
        <path d="M14 4l6 6L9 21H3v-6z" />
        <line x1="12" y1="6" x2="18" y2="12" />
      </g>
    ),
    search: (
      <g>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </g>
    ),
    spark: <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />,
    star: (
      <polygon points="12 3 14.5 9 21 9.5 16 13.8 17.6 20 12 16.5 6.4 20 8 13.8 3 9.5 9.5 9" />
    ),
    quote: (
      <g>
        <path d="M7 7h4v4c0 3-1.5 5-4 6" />
        <path d="M15 7h4v4c0 3-1.5 5-4 6" />
      </g>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? null}
    </svg>
  );
}

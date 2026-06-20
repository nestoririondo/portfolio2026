import type { IconName } from "../components/ui/Icon";

/** Top navigation + footer links. `href` are in-page anchors. */
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Arbeiten", href: "#arbeiten" },
  { label: "Software", href: "#software" },
  { label: "Angebot", href: "#angebot" },
  { label: "Über mich", href: "#ueber" },
  { label: "Kontakt", href: "#kontakt" },
];

export const LANGUAGES = ["DE", "EN", "ES"] as const;
export type Language = (typeof LANGUAGES)[number];

/** Software → Outcomes section. `gfx` selects the mini-UI; `px` is parallax speed. */
export type OutcomeGfx = "booking" | "chart" | "inbox" | "ai";

export interface Outcome {
  n: string;
  gfx: OutcomeGfx;
  title: string;
  body: string;
  px: number;
}

export const OUTCOMES: Outcome[] = [
  {
    n: "01",
    gfx: "booking",
    title: "Termine ohne Telefon",
    body: "Kunden buchen selbst — Tag und Nacht.",
    px: 0.05,
  },
  {
    n: "02",
    gfx: "chart",
    title: "Immer aktuell",
    body: "Inhalte live aus Ihrer Software.",
    px: -0.06,
  },
  {
    n: "03",
    gfx: "inbox",
    title: "Anfragen direkt zu Ihnen",
    body: "Ein Formular, das wirklich ankommt.",
    px: -0.05,
  },
  {
    n: "04",
    gfx: "ai",
    title: "Hilfe rund um die Uhr",
    body: "KI beantwortet, was Kunden fragen.",
    px: 0.06,
  },
];

/** Angebot section. */
export const OFFER_INCLUDED: string[] = [
  "Modernes, individuelles Design",
  "Perfekt auf dem Handy",
  "Kontaktformular",
  "Google-Business-Einrichtung",
  "Texte schreibe ich für Sie",
  "SEO-Grundlagen inklusive",
];

export interface OfferHighlight {
  icon: IconName;
  title: string;
  body: string;
}

export const OFFER_HIGHLIGHTS: OfferHighlight[] = [
  {
    icon: "pen",
    title: "Sie schreiben keine Zeile",
    body: "Die Texte übernehme ich für Sie.",
  },
  {
    icon: "spark",
    title: "In 2–3 Wochen online",
    body: "Schnell, ohne langes Hin und Her.",
  },
  {
    icon: "check",
    title: "ab 2.500 €",
    body: "Ein fairer Festpreis. Keine Überraschungen.",
  },
];

/** Über mich chips. */
export interface AboutChip {
  icon: IconName;
  label: string;
}

export const ABOUT_CHIPS: AboutChip[] = [
  { icon: "pin", label: "Alt-Treptow, Berlin" },
  { icon: "globe", label: "DE · EN · ES" },
  { icon: "phoneDevice", label: "Auch Apps & Tools" },
  { icon: "spark", label: "KI-Integration" },
];

/** Sticky case study (REB) chapters. */
export interface CaseChapter {
  k: string;
  label: string;
  title: string;
  body: string;
}

export const REB_CHAPTERS: CaseChapter[] = [
  {
    k: "01",
    label: "Vorher",
    title: "Eine Seite von 2009",
    body: "Objekte wurden von Hand eingepflegt — und waren ständig veraltet.",
  },
  {
    k: "02",
    label: "Jetzt",
    title: "Direkt aus der Maklersoftware",
    body: "Die Website zieht die Objekte live aus Propstack. Was dort steht, ist sofort online — ohne ein einziges manuelles Update.",
  },
  {
    k: "03",
    label: "Ergebnis",
    title: "Immer aktuell, auch mobil",
    body: "Neue Objekte erscheinen automatisch, auf jedem Gerät. Mehr Anfragen, kein Pflegeaufwand.",
  },
];

/** Footer link groups. */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Arbeiten", href: "#arbeiten" },
  { label: "Software", href: "#software" },
  { label: "Angebot", href: "#angebot" },
  { label: "Kontakt", href: "#kontakt" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Impressum", href: "#" },
  { label: "Datenschutz", href: "#" },
];

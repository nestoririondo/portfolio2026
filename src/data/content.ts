import type { IconName } from "../components/ui/Icon";
import type { ProcessGfx } from "../components/sections/ProcessGraphic";

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

/** Central contact details. */
export const CONTACT = {
  email: "hello@nestoririondo.com",
  emailHref: "mailto:hello@nestoririondo.com",
  phoneDisplay: "+49 170 123 45 67",
  phoneHref: "tel:+491701234567",
  whatsappHref: "https://wa.me/491701234567",
  location: "Alt-Treptow, Berlin",
  /** Serverless endpoint that sends the contact form via Resend (see api/contact.ts). */
  formEndpoint: "/api/contact",
};

/** Software → Outcomes section. `gfx` selects the mini-UI; `px` is parallax speed. */
export type OutcomeGfx = "booking" | "sync" | "reviews" | "ai";

export interface Outcome {
  n: string;
  gfx: OutcomeGfx;
  title: string;
  body: string;
  px: number;
  screenTilt: number;
  screenRotateSpeed: number;
}

export const OUTCOMES: Outcome[] = [
  {
    n: "01",
    gfx: "booking",
    title: "Termine online buchen",
    body: "Kund:innen buchen freie Zeiten selbst – rund um die Uhr, ganz ohne Telefon.",
    px: 0.03,
    screenTilt: -2.5,
    screenRotateSpeed: 0.006,
  },
  {
    n: "02",
    gfx: "sync",
    title: "Immer aktuelle Inhalte",
    body: "Angebote, Preise oder Verfügbarkeiten aktualisieren sich automatisch – du pflegst sie nur an einer Stelle.",
    px: 0.03,
    screenTilt: -2,
    screenRotateSpeed: -0.0045,
  },
  {
    n: "03",
    gfx: "reviews",
    title: "Google-Bewertungen zeigen",
    body: "Deine besten Google-Bewertungen erscheinen automatisch – und schaffen Vertrauen, noch bevor jemand anruft.",
    px: 0.08,
    screenTilt: -3.25,
    screenRotateSpeed: 0.0075,
  },
  {
    n: "04",
    gfx: "ai",
    title: "Fragen automatisch beantworten",
    body: "Ein KI-Assistent beantwortet häufige Fragen rund um die Uhr – und leitet echte Anfragen direkt an dich weiter.",
    px: 0.08,
    screenTilt: -1.75,
    screenRotateSpeed: -0.006,
  },
];

/** Angebot section. */
export const OFFER_INCLUDED: string[] = [
  "Individuelles Design",
  "Mobil optimiert",
  "Schnelle Ladezeiten",
  "SEO-Grundlagen",
  "Google Business",
  "Text & Struktur",
  "Kontaktformular",
  "Rechtstexte",
];

/** The 3-step way of working — short, scannable. Each body is one phrase. */
export interface OfferStep {
  n: string;
  icon: IconName;
  title: string;
  body: string;
  /** Short muted caption under the step — sets the time/effort expectation. */
  meta?: string;
  /** Flat-geometric layered graphic (with parallax) shown instead of the line icon. */
  gfx?: ProcessGfx;
}

export const OFFER_PROCESS: OfferStep[] = [
  {
    n: "1",
    icon: "phone",
    title: "Ein Gespräch",
    body: "Du erzählst mir dein Ziel – per Telefon oder bei dir vor Ort.",
    meta: "ca. 30 Min · kostenlos",
    gfx: "talk",
  },
  {
    n: "2",
    icon: "pen",
    title: "Ein klickbarer Entwurf",
    body: "Du siehst & klickst deine Seite, bevor irgendwas final ist.",
    meta: "ca. 1–2 Wochen",
    gfx: "plan",
  },
  {
    n: "3",
    icon: "layout",
    title: "Deine Live-Seite",
    body: "Fertig online – mobil optimiert und bereit für neue Anfragen.",
    meta: "meist in 4–6 Wochen live",
    gfx: "build",
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
  { icon: "phoneDevice", label: "Websites & Tools" },
  { icon: "check", label: "Betreuung nach Launch" },
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
    title: "Eine Website ohne Immobilien",
    body: "Ein in die Jahre gekommenes WordPress-Theme — viel Text, ein paar Fotos, aber kein einziges Objekt zu sehen.",
  },
  {
    k: "02",
    label: "Nachher",
    title: "Alle Objekte auf der eigenen Seite",
    body: "Jetzt spielt die Website die Immobilien live aus der Maklersoftware aus — immer aktuell, ganz ohne Handarbeit.",
  },
  {
    k: "03",
    label: "Das Ergebnis",
    title: "Unabhängig und immer aktuell",
    body: "Anfragen kommen direkt über die eigene Seite — kein Umweg über Portale, auf jedem Gerät gut lesbar.",
  },
];

/** Footer link groups. */
export const FOOTER_LINKS: NavLink[] = NAV_LINKS;

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

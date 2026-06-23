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
}

export const OUTCOMES: Outcome[] = [
  {
    n: "01",
    gfx: "booking",
    title: "Termine online buchen",
    body: "Kund:innen buchen freie Zeiten selbst – rund um die Uhr, ganz ohne Telefon.",
    px: 0.03,
  },
  {
    n: "02",
    gfx: "sync",
    title: "Immer aktuelle Inhalte",
    body: "Angebote, Preise oder Verfügbarkeiten aktualisieren sich automatisch – du pflegst sie nur an einer Stelle.",
    px: 0.03,
  },
  {
    n: "03",
    gfx: "reviews",
    title: "Bewertungen, die überzeugen",
    body: "Deine besten Google-Bewertungen erscheinen automatisch – und schaffen Vertrauen, noch bevor jemand anruft.",
    px: 0.08,
  },
  {
    n: "04",
    gfx: "ai",
    title: "KI-Assistent, auf Wunsch",
    body: "Beantwortet rund um die Uhr die häufigsten Fragen – und leitet echte Anfragen direkt an dich weiter.",
    px: 0.08,
  },
];

/** Angebot section. */
export const OFFER_INCLUDED: string[] = [
  "Individuelles Design",
  "Für Handy optimiert",
  "Schnelle Ladezeiten",
  "Bei Google gefunden (SEO)",
  "Google-Business-Profil",
  "Texte inklusive",
  "Kontaktformular",
  "Rechtssicher: Impressum & Datenschutz",
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
    meta: "in wenigen Tagen",
    gfx: "plan",
  },
  {
    n: "3",
    icon: "layout",
    title: "Deine Live-Seite",
    body: "Fertig online – für Handy optimiert und bei Google zu finden.",
    meta: "meist in 2–3 Wochen live",
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
  { icon: "phoneDevice", label: "Web, Apps & Tools" },
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
    title: "Eine Seite ohne Objekte",
    body: "Ein älteres WordPress-Theme: viel Text, ein paar Fotos — aber keine Immobilien.",
  },
  {
    k: "02",
    label: "Die Arbeit",
    title: "Die Objekte auf der eigenen Seite",
    body: "Jetzt zieht die Website die Immobilien live aus der Maklersoftware — immer aktuell, ganz ohne Handarbeit.",
  },
  {
    k: "03",
    label: "Das Ergebnis",
    title: "Unabhängig und immer aktuell",
    body: "Anfragen kommen direkt über die eigene Seite — unabhängig und auf jedem Gerät gut lesbar.",
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

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
  email: "hallo@nestoririondo.de",
  emailHref: "mailto:hallo@nestoririondo.de",
  phoneDisplay: "+49 170 123 45 67",
  phoneHref: "tel:+491701234567",
  whatsappHref: "https://wa.me/491701234567",
  location: "Alt-Treptow, Berlin",
};

/** Software → Outcomes section. `gfx` selects the mini-UI; `px` is parallax speed. */
export type OutcomeGfx = "booking" | "sync" | "inbox" | "ai";

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
    body: "Kund:innen buchen freie Zeiten direkt online – auch nach Feierabend.",
    px: 0.05,
  },
  {
    n: "02",
    gfx: "sync",
    title: "Immer aktuelle Inhalte",
    body: "Angebote, Termine oder Objekte aktualisieren sich automatisch aus deinen Tools – ganz ohne Doppelarbeit.",
    px: -0.06,
  },
  {
    n: "03",
    gfx: "inbox",
    title: "Anfragen, die ankommen",
    body: "Ein Kontaktformular, dessen Nachrichten zuverlässig bei dir landen.",
    px: -0.05,
  },
  {
    n: "04",
    gfx: "ai",
    title: "KI-Assistent, auf Wunsch",
    body: "Beantwortet rund um die Uhr die häufigsten Fragen deiner Kund:innen.",
    px: 0.06,
  },
];

/** Angebot section. */
export const OFFER_INCLUDED: string[] = [
  "Individuelles Design",
  "Für Handy optimiert",
  "Bei Google gefunden (SEO)",
  "Google-Business-Profil",
  "Kontaktformular",
  "Texte inklusive",
  "Schnell & sicher (SSL)",
  "Rechtssicher: Impressum & Datenschutz",
];

/** The 3-step way of working — short, scannable. Each body is one phrase. */
export interface OfferStep {
  n: string;
  icon: IconName;
  title: string;
  body: string;
  /** Flat-geometric layered graphic (with parallax) shown instead of the line icon. */
  gfx?: ProcessGfx;
}

export const OFFER_PROCESS: OfferStep[] = [
  {
    n: "1",
    icon: "phone",
    title: "Ein Gespräch",
    body: "Du erzählst mir dein Ziel – per Telefon oder bei dir vor Ort.",
    gfx: "talk",
  },
  {
    n: "2",
    icon: "pen",
    title: "Ein klickbarer Entwurf",
    body: "Du siehst & klickst deine Seite, bevor irgendwas final ist.",
    gfx: "plan",
  },
  {
    n: "3",
    icon: "layout",
    title: "Deine Live-Seite",
    body: "Fertig online – für Handy optimiert und bei Google zu finden.",
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
    body: "Die Website zieht die Objekte live aus Propstack. Was dort steht, ist sofort online — ohne manuelle Updates.",
  },
  {
    k: "03",
    label: "Ergebnis",
    title: "Immer aktuell, auch mobil",
    body: "Neue Objekte erscheinen automatisch und sind auf jedem Gerät gut lesbar — mit deutlich weniger Pflegeaufwand.",
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

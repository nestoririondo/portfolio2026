import type { IconName } from "../components/ui/Icon";
import type { ProcessGfx } from "../components/sections/ProcessGraphic";

export interface NavLink {
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#arbeiten" },
  { href: "#software" },
  { href: "#angebot" },
  { href: "#ueber" },
  { href: "#kontakt" },
];

export const LANGUAGES = ["de", "en", "es"] as const;
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
  px: number;
  screenTilt: number;
  screenRotateSpeed: number;
}

export const OUTCOMES: Outcome[] = [
  {
    n: "01",
    gfx: "booking",
    px: 0.03,
    screenTilt: -2.5,
    screenRotateSpeed: 0.006,
  },
  {
    n: "02",
    gfx: "sync",
    px: 0.03,
    screenTilt: -2,
    screenRotateSpeed: -0.0045,
  },
  {
    n: "03",
    gfx: "reviews",
    px: 0.08,
    screenTilt: -3.25,
    screenRotateSpeed: 0.0075,
  },
  {
    n: "04",
    gfx: "ai",
    px: 0.08,
    screenTilt: -1.75,
    screenRotateSpeed: -0.006,
  },
];

export interface OfferStep {
  n: string;
  icon: IconName;
  gfx?: ProcessGfx;
}

export const OFFER_PROCESS: OfferStep[] = [
  {
    n: "1",
    icon: "phone",
    gfx: "talk",
  },
  {
    n: "2",
    icon: "pen",
    gfx: "plan",
  },
  {
    n: "3",
    icon: "layout",
    gfx: "build",
  },
];

export interface AboutChip {
  icon: IconName;
}

export const ABOUT_CHIPS: AboutChip[] = [
  { icon: "pin" },
  { icon: "globe" },
  { icon: "phoneDevice" },
  { icon: "check" },
];

export const FOOTER_LINKS: NavLink[] = NAV_LINKS;

export const FOOTER_LEGAL: NavLink[] = [
  { href: "/impressum" },
  { href: "/datenschutz" },
];

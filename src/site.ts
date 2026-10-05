/** Site-wide constants. */
export const SITE = {
  name: "Néstor Iriondo",
  url: "https://nestoririondo.com",
  description:
    "Néstor Iriondo writes about building software, leading people, and what AI changes about both.",
  email: "hello@nestoririondo.com",
};

/** Profiles linked from the homepage. Entries without a URL are not shown. */
export const PROFILES = [
  { label: "LinkedIn", href: "" }, // TODO: Néstor adds his LinkedIn profile URL
];

export const NAV = [
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (date: Date) => dateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

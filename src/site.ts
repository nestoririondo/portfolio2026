/** Site-wide constants. */
export const SITE = {
  name: "Néstor Iriondo",
  url: "https://nestoririondo.com",
  description:
    "Néstor Iriondo writes about building software, leading people, and what AI changes about both.",
  email: "hello@nestoririondo.com",
  /** Shown on the share image (public/og.png) and as its alt text. */
  tagline:
    "I lead a team building an industrial IoT platform in Berlin, and write about software, leadership and AI.",
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

/** schema.org Person; `sameAs` links the site to the public profiles. */
export const person = (image?: string) => ({
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  ...(image && { image }),
  worksFor: { "@type": "Organization", name: "Murrelektronik" },
  homeLocation: { "@type": "Place", name: "Berlin" },
  sameAs: PROFILES.map(({ href }) => href).filter(Boolean),
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (date: Date) => dateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

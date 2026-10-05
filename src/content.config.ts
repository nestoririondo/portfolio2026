import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    /** Drafts show in `npm run dev` but are left out of the build, RSS and sitemap. */
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      /** Position in lists, ascending. */
      order: z.number(),
      /** What kind of work it is, e.g. "Own product", "Client work", "Day job". */
      kind: z.string(),
      /** Main technologies, shown after the kind. */
      stack: z.array(z.string()).default([]),
      /** Public URL, if the project has one. */
      url: z.url().optional(),
      /** Screenshot shown in lists and at the top of the project page. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

/** Standalone text pages: about, hire (en + de). */
const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

/** Legal notice and privacy text, one file per page and language. */
const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    page: z.enum(["impressum", "datenschutz"]),
    lang: z.enum(["de", "en", "es"]),
  }),
});

export const collections = { writing, projects, pages, legal };

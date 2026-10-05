# nestoririondo.com

Personal site, built with [Astro](https://astro.build). Every page is rendered to
static HTML at build time; no JavaScript is shipped to the browser.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # live preview at http://localhost:4321
npm run build    # type-check + build to dist/
npm run preview  # serve the built site locally
```

## Writing a post

Add an `.mdx` file to `src/content/writing/`. The file name becomes the URL
(`my-post.mdx` → `/writing/my-post`).

```mdx
---
title: "Post title"
date: 2026-10-01
summary: "One line, shown in lists, RSS and link previews."
---

Text in Markdown. Footnotes[^1], code blocks, quotes and images are styled.

[^1]: Like this.
```

A missing or mistyped frontmatter field fails the build. The same applies to
projects (`src/content/projects/`, fields: `title`, `summary`, `order`,
optional `url` and `note`).

## Structure

```
src/
  site.ts               # site name, email, navigation
  content.config.ts     # frontmatter schemas
  content/
    writing/            # posts
    projects/           # one page per project
    pages/              # about, hire (en), hire-de
    legal/              # Impressum + Datenschutz in de, en, es
  pages/                # routes: one file per URL pattern
  layouts/              # Base (head, header, footer), Page (long-form text)
  components/           # Header, Footer, PostList, ProjectList
  styles/
    tokens.css          # colours, type scale, spacing — adjust the design here
    global.css          # base styles, header, footer, lists
    prose.css           # long-form typography
  assets/               # images, optimised at build time
public/                 # copied as-is: favicons, og.png, robots.txt
```

## Languages

The site is English. Exceptions: `/hire` also exists in German at `/de/hire`,
and the legal pages exist in German, English and Spanish at
`/{de,en,es}/impressum` and `/{de,en,es}/datenschutz`. There is no i18n
library; each language version is its own content file.

## Deployment (Hetzner + Dokploy)

The `Dockerfile` builds the site and serves `dist/` with Caddy on port 3000.
The `Caddyfile` also holds the redirects from the old site's URLs. No
environment variables are needed.

```bash
docker build -t nestoririondo .
docker run --rm -p 3000:3000 nestoririondo
```

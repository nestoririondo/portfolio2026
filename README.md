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

Add `draft: true` to keep a post out of the build: drafts show in `npm run dev`
but not on the live site, in RSS or in the sitemap. The Writing link in the
navigation and the Writing section on the homepage appear once at least one
post is published.

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
    legal/              # Impressum + Datenschutz in de, en
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
`/{de,en}/impressum` and `/{de,en}/datenschutz`. There is no i18n
library; each language version is its own content file.

## Deployment (Hetzner + Dokploy)

The `Dockerfile` builds the site and serves `dist/` with Caddy on port 3000.
The `Caddyfile` also holds the redirects from the old site's URLs. No
environment variables are needed.

```bash
docker build -t nestoririondo .
docker run --rm -p 3000:3000 nestoririondo
```

### Auto-deploy on push

Dokploy is behind the firewall, so GitHub webhooks can't reach it. Instead a
systemd timer on the server checks the deploy branch every 5 minutes and calls
Dokploy's deploy API when it sees a new commit. A push is live within about
5 minutes plus build time. Files are in `deploy/`.

One-time setup on the server:

1. In Dokploy, generate an API key (Settings → Profile → API/CLI) and note
   the site's application ID (it is in the application's URL).
2. Copy the files and create the config:

   ```bash
   sudo install -m 755 deploy/dokploy-poll.sh /usr/local/bin/
   sudo install -m 644 deploy/dokploy-poll.service deploy/dokploy-poll.timer /etc/systemd/system/
   sudo install -m 600 /dev/null /etc/dokploy-poll.env
   sudo tee /etc/dokploy-poll.env > /dev/null <<'EOF'
   REPO_URL=https://github.com/nestoririondo/portfolio2026.git
   BRANCH=main
   APPLICATION_ID=<application id>
   DOKPLOY_API_KEY=<api key>
   EOF
   sudo systemctl daemon-reload
   sudo systemctl enable --now dokploy-poll.timer
   ```

   `BRANCH` must match the branch the Dokploy application builds from.

3. Check it: `sudo systemctl start dokploy-poll.service` then
   `journalctl -u dokploy-poll.service -n 20`. The first run only records the
   current commit; the next push triggers a deploy.
4. In Dokploy, add a notification (Settings → Notifications) for build
   errors. The script only knows that Dokploy accepted the deploy; if the
   build then fails, the old version stays live and nothing retries.

The repository must stay public: the script reads the branch from GitHub
without credentials.

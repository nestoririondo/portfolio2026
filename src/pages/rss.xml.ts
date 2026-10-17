import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx/container-renderer";
import { getPosts } from "../content";
import { SITE } from "../site";

/** Turn root-relative links and images ("/writing/x") into absolute URLs, so feed readers and Substack can follow them. */
function absolutize(html: string, site: URL): string {
  return html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, path) => `${attr}="${new URL(path, site)}"`);
}

export async function GET(context: APIContext) {
  const site = new URL(context.site ?? SITE.url);
  const posts = await getPosts();

  // Render each post's MDX body to HTML so the feed carries the full text, not only the summary.
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content);
      return {
        title: post.data.title,
        description: post.data.summary,
        content: absolutize(html, site),
        pubDate: post.data.date,
        link: `/writing/${post.id}`,
      };
    }),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site,
    items,
    customData: "<language>en</language>",
    trailingSlash: false,
  });
}

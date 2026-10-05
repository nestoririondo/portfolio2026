import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../content";
import { SITE } from "../site";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/writing/${post.id}`,
    })),
    customData: "<language>en</language>",
    trailingSlash: false,
  });
}

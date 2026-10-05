import { getCollection } from "astro:content";

/** All posts, newest first. Drafts only in development. */
export async function getPosts() {
  const posts = await getCollection("writing", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All projects, in their defined order. */
export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

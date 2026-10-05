import { getCollection } from "astro:content";

/** All posts, newest first. */
export async function getPosts() {
  const posts = await getCollection("writing");
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All projects, in their defined order. */
export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

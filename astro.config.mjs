import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { createCssVariablesTheme } from "shiki/core";

// Code colours come from CSS variables (see src/styles/tokens.css), so code
// blocks follow the palette in light and dark mode without shipping two themes.
const codeTheme = createCssVariablesTheme({
  name: "tokens",
  variablePrefix: "--code-",
  fontStyle: true,
});

export default defineConfig({
  site: "https://nestoririondo.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith("/404") })],
  markdown: {
    shikiConfig: { theme: codeTheme, wrap: false },
  },
});

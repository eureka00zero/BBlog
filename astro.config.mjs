// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://eureka00zero.github.io",
  base: "/BBlog",
  integrations: [mdx(), sitemap(), react()],
});

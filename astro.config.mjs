// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), astroI18next()],
  output: "server",
  adapter: vercel(),
});

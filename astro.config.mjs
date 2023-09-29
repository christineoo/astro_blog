import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkGemoji from "remark-gemoji";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./src/utils/calculate-reading-time.ts";
import react from "@astrojs/react";
import rehypePrettyCode from "rehype-pretty-code";
import mdx from "@astrojs/mdx";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  markdown: {
    // extendDefaultPlugins: true,
    syntaxHighlight: false,
    remarkPlugins: [remarkToc, remarkGemoji, remarkReadingTime],
    rehypePlugins: [rehypeHeadingIds, rehypePrettyCode],
  },
  site: "https://astro-blog-1234.netlify.app",
  integrations: [
    mdx(),
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    robotsTxt(),
  ],
});

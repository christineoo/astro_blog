import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkGemoji from "remark-gemoji";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./src/utils/calculate-reading-time.ts";


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
    // Example: Switch to use prism for syntax highlighting in Markdown
    syntaxHighlight: "prism",
    remarkPlugins: [remarkToc, remarkGemoji, remarkReadingTime],
    rehypePlugins: [rehypeHeadingIds]
  },
  site: "https://astro-blog-1234.netlify.app",
  integrations: [
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

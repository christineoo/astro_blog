import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkGemoji from "remark-gemoji";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  markdown: {
    // Example: Switch to use prism for syntax highlighting in Markdown
    syntaxHighlight: "prism",
    remarkPlugins: [remarkToc, remarkGemoji],
    rehypePlugins: [rehypeHeadingIds]
  },
  integrations: [tailwind(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })]
});

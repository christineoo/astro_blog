import { NavItems } from "./types";

export const SITE = {
  // Your site's detail?
  name: "C's Blog",
  title: "Astro - Ink",
  description: "A space where I scribble down my thoughts",
  url: "",
  githubUrl: "https://github.com/christineoo/astro_blog",
  listDrafts: true,
  image:
    "astro-banner.png",
  // YT video channel Id (used in media.astro)
  ytChannelId: "",
  // Optional, user/author settings (example)
  // Author: name
  author: "", // Example: asdf
  // Author: Twitter handler
  authorTwitter: "", // Example: asdf
  // Author: Image external source
  authorImage: "", // Example: asdf.png 
};

export const NAV_ITEMS: NavItems = {
  home: {
    path: "/",
    title: "home",
  },
  blog: {
    path: "/blog",
    title: "blog",
  },
  tags: {
    path: "/tags",
    title: "tags",
  },
  about: {
    path: "/about",
    title: "about",
  },
};

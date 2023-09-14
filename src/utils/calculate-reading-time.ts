import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree: any, { data }: { data: any }) {
    const textOnPage = toString(tree);
    // console.log("==========");
    // console.log(textOnPage);
    const readingTime = getReadingTime(textOnPage);
    console.log(`readingTime123: ${readingTime.text}`);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

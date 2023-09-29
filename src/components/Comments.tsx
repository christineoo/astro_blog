import * as React from "react";
import Giscus from "@giscus/react";

const id = "comments";

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState(
    window.localStorage.getItem("theme"),
  );

  React.useEffect(() => {
    setMounted(true);
    function handleThemeUpdate() {
      setTheme(window.localStorage.getItem("theme"));
    }
    window.addEventListener("themeUpdated", handleThemeUpdate);
    return () => window.removeEventListener("themeUpdated", handleThemeUpdate);
  }, []);

  return (
    <div id={id}>
      {mounted ? (
        <Giscus
          id={id}
          repo="christineoo/astro_blog"
          repoId="R_kgDOI1g4SQ"
          category="Announcements"
          categoryId="DIC_kwDOI1g4Sc4CZStz"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
          loading="lazy"
          theme={JSON.parse(theme)}
        />
      ) : null}
    </div>
  );
};

export default Comments;

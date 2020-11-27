import { useEffect } from "react";
import Router, { useRouter } from "next/router";

// hack to preserve scroll position across navigations in next.js
// https://gist.github.com/claus/992a5596d6532ac91b24abe24e10ae81

function saveScrollPos(key: string) {
  const scrollPos = {
    x: window.scrollX,
    y: window.scrollY,
  };

  sessionStorage.setItem(key, JSON.stringify(scrollPos));
}

function restoreScrollPos(key: string) {
  try {
    const { x, y } = JSON.parse(sessionStorage.getItem(key) || "");
    window.scrollTo(x, y);
  } catch {
    // ignored
  }
}

export function useScrollPreserver() {
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      let shouldScrollRestore = false;

      window.history.scrollRestoration = "manual";
      restoreScrollPos(router.asPath);

      const onBeforeUnload = (e: BeforeUnloadEvent) => {
        saveScrollPos(router.asPath);
        delete e["returnValue"];
      };

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = (url: string) => {
        if (shouldScrollRestore) {
          shouldScrollRestore = false;
          restoreScrollPos(url);
        }
      };

      window.addEventListener("beforeunload", onBeforeUnload);
      Router.events.on("routeChangeStart", onRouteChangeStart);
      Router.events.on("routeChangeComplete", onRouteChangeComplete);

      Router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
        Router.events.off("routeChangeStart", onRouteChangeStart);
        Router.events.off("routeChangeComplete", onRouteChangeComplete);
        Router.beforePopState(() => true);
      };
    }
  }, [router]);
}

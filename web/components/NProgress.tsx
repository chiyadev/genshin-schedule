import { memo, useEffect } from "react";
import Router from "next/router";
import { done, start } from "nprogress";

const NProgress = () => {
  useEffect(() => {
    // timeout prevents shallow routing from causing the progress bar to show
    let startTimeout: number;

    const handleStart = () => {
      clearTimeout(startTimeout);
      startTimeout = window.setTimeout(start);
    };

    const handleEnd = () => {
      clearTimeout(startTimeout);
      done();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleEnd);
    Router.events.on("routeChangeError", handleEnd);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleEnd);
      Router.events.off("routeChangeError", handleEnd);
    };
  }, []);

  return null;
};

export default memo(NProgress);

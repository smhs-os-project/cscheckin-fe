import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import "@fontsource/noto-sans-tc";
import "@fontsource/fira-sans";
import "../styles/global.css";
import "../styles/nprogress.css";
import { initGA, logPageView } from "../utilities/analytics";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes("?")) {
      logPageView();
    }
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

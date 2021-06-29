import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import "@fontsource/noto-sans-tc";
import "@fontsource/pt-sans";
import "../styles/global.css";
import "../styles/nprogress.css";
import Client from "cscheckin-js-sdk/dist/request/client";
import * as gtag from "../utilities/analytics";

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
  Client.getInstance().BackendURI = "https://dev.api.csc.deershark.com/api";

  // mostly from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

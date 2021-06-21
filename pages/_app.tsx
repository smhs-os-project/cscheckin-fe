import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import "@fontsource/noto-sans-tc";
import "@fontsource/fira-sans";
import "../styles/global.css";
import "../styles/nprogress.css";
import { initGA, logPageView } from "../utilities/analytics";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
  initGA();
  logPageView();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  logPageView();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

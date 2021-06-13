import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import "@fontsource/noto-sans-tc";
import "@fontsource/fira-sans";
import "../styles/global.css";
import "../styles/nprogress.css";

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
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

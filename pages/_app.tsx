import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/nprogress.css";
import { ENABLE_GA } from "../consts";
import * as gtag from "../utilities/Analytics/analytics";
import useAuth from "../components/Database/AuthStore/useAuth";
import Sentry from "../utilities/ErrorReporting/sentry";

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
  // mostly from https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (ENABLE_GA) {
      const handleRouteChange = (url: string) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }

    return undefined;
  }, [router.events]);

  useEffect(() => {
    if (auth) {
      void auth
        .userInfo()
        .then((user) =>
          Sentry.setUser({
            id: user?.id.toString(),
            username: user?.name,
            email: user?.email,
          })
        )
        .catch(() => null);
    }
  }, [auth]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

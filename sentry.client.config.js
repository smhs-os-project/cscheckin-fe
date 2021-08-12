// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import InvalidCredential from "./components/Database/AuthStore/exceptions/InvalidCredential";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://8951f0b3e3b5442d815dd82410322e1f@o877730.ingest.sentry.io/5828704",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,
  beforeSend(event, hint) {
    const exception = hint.originalException;

    if (exception instanceof InvalidCredential) {
      return null;
    }

    return event;
  },
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

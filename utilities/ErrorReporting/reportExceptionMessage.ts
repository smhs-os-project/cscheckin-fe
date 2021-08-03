import type { Context } from "@sentry/types";
import { ENABLE_SENTRY } from "../../consts";
import Sentry from "./sentry";

export function reportExceptionMessage(message: string, extra: Context = {}) {
  if (ENABLE_SENTRY)
    Sentry.captureMessage(message, {
      level: Sentry.Severity.Error,
      contexts: {
        details: {
          reportWith: "reportExceptionMessage",
          ...extra,
        },
      },
    });
}

export function reportException(exception: Error, extra: Context = {}) {
  if (ENABLE_SENTRY)
    Sentry.captureException(exception, {
      level: Sentry.Severity.Error,
      contexts: {
        details: {
          reportWith: "reportException",
          ...extra,
        },
      },
    });
}

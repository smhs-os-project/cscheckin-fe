import Sentry from "./sentry";

export function reportExceptionMessage(message: string, details: string) {
  Sentry.captureMessage(message, {
    level: Sentry.Severity.Error,
    contexts: {
      details: {
        details,
      },
    },
  });
}

export function reportException(exception: Error, reason = "") {
  Sentry.captureException(exception, {
    level: Sentry.Severity.Error,
    contexts: {
      details: {
        reason,
      },
    },
  });
}

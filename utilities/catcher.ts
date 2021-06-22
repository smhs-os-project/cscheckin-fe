import Sentry from "./sentry";

export default function catcherBuilder(
  setMessage: (val: string) => void,
  setFailedStage: () => void
): (error?: Error | string) => void {
  return (error?: Error | string) => {
    if (error) {
      if (typeof error === "string") {
        setMessage(error);
        Sentry.captureMessage(error);
      } else {
        setMessage(error.message);
        Sentry.captureException(error);
      }
    } else {
      setMessage("發生未知錯誤。");
      Sentry.captureException("Encountered a unknown exception.");
    }
    setFailedStage();
  };
}

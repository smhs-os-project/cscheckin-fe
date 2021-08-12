import { useState } from "react";
import { reportException } from "../../utilities/ErrorReporting/reportExceptionMessage";

export type PushErrorHandler = (error: unknown) => void;

export function unknownToError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === "object") {
    return new Error(JSON.stringify(error));
  }

  return new Error(`${error}`);
}

export default function useError(): [Error | null, PushErrorHandler] {
  const [error, setError] = useState<Error>();

  const pushErrorHandler: PushErrorHandler = (rawError) => {
    if (rawError) {
      const receivedErrorObject = unknownToError(rawError);
      reportException(receivedErrorObject);
      setError(receivedErrorObject);
    }
  };

  return [error ?? null, pushErrorHandler];
}

import { useState } from "react";
import {
  reportException,
  reportExceptionMessage,
} from "./reportExceptionMessage";

export type PushErrorHandler = (error: unknown) => void;

export function unknownToError(error: unknown): Error {
  if (error instanceof Error) {
    reportException(error);
    return error;
  }

  if (typeof error === "object") {
    reportExceptionMessage(JSON.stringify(error));
    return new Error(JSON.stringify(error));
  }

  reportExceptionMessage(`${error}`);
  return new Error(`${error}`);
}

export default function useError(): [Error | null, PushErrorHandler] {
  const [error, setError] = useState<Error>();
  const pushErrorHandler: PushErrorHandler = (rawError) => {
    if (rawError) setError(unknownToError(rawError));
  };

  return [error ?? null, pushErrorHandler];
}

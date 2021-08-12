import { useState } from "react";

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
    if (rawError) setError(unknownToError(rawError));
  };

  return [error ?? null, pushErrorHandler];
}

import { useEffect } from "react";
import useSWR from "swr";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useError from "../../utilities/ErrorReporting/useError";
import type { HttpResponse } from "./HttpResponse";

export default function useHttpBuilder<Payload = unknown, Response = unknown>(
  key: string,
  asyncFunction: (
    key: string,
    auth?: CSCAuth,
    payload?: Payload
  ) => Promise<Response>,
  auth?: CSCAuth,
  payload?: Payload
): HttpResponse<Response> {
  const [error, setError] = useError();
  const response = useSWR([key, auth, payload], asyncFunction);

  useEffect(() => {
    setError(response.error);
  }, [response.error, setError]);

  return {
    data: response.data ?? null,
    error,
    pending: !(response.data || error),
  };
}

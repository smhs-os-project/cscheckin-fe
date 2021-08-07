import { useEffect } from "react";
import useSWR from "swr";
import useError from "../../utilities/ErrorReporting/useError";
import type { HttpResponse } from "./HttpResponse";

export default function useHttpBuilder<
  Payload = null,
  Auth = null,
  Response = unknown
>(
  key: string,
  asyncFunction: (
    key: string,
    auth: Auth,
    payload: Payload
  ) => Promise<Response>,
  auth?: Auth,
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

import { useEffect } from "react";
import useSWR from "swr";
import type { SWRConfiguration } from "swr/dist/types";
import useError from "../Hooks/useError";
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
  payload?: Payload,
  swrConfiguration?: SWRConfiguration<Response, Error>
): HttpResponse<Response> {
  const [error, setError] = useError();
  const response = useSWR(
    [key, auth, payload],
    asyncFunction,
    swrConfiguration
  );

  useEffect(() => {
    if (response.error) setError(response.error);
  }, [response.error, setError]);

  return {
    data: response.data ?? null,
    error,
    pending: !(response.data || error),
  };
}

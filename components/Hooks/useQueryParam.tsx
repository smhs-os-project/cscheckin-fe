import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface QueryParamResponse {
  value: string | null;
  loading: boolean;
  notSpecified: boolean;
}

/**
 * Get the value of the query parameter [paramName]
 *
 * @param paramName the query parameter name
 */
export default function useQueryParam(paramName: string): QueryParamResponse {
  const router = useRouter();
  const [response, setResponse] = useState<QueryParamResponse>({
    value: null,
    loading: true,
    notSpecified: false,
  });
  const query = router?.query[paramName];

  useEffect(() => {
    if (!router) return;
    if (!router.isReady) return;

    if (typeof query === "string")
      setResponse({
        value: query,
        loading: false,
        notSpecified: false,
      });
    else
      setResponse({
        value: null,
        loading: false,
        notSpecified: true,
      });
  }, [query, router]);

  return response;
}

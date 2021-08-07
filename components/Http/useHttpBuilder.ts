import { useEffect, useState } from "react";
import useError from "../../utilities/ErrorReporting/useError";
import type { HttpResponse } from "./HttpResponse";

export default function useHttpBuilder<T>(
  asyncFunction: () => Promise<T>
): HttpResponse<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useError();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    void asyncFunction()
      .then((inData) => setData(inData))
      .catch((err) => setError(err))
      .finally(() => setPending(false));
  });

  return {
    data: data ?? null,
    error,
    pending,
  };
}

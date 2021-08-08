import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import useError from "../../../utilities/ErrorReporting/useError";
import AuthStore from "./index";

const authStore = AuthStore.getCommonInstance();

export interface AuthResponse {
  auth: CSCAuth | null;
  error: Error | null;
  pending: boolean;
}

export default function useAuth(): AuthResponse {
  const [auth, setAuth] = useState<CSCAuth>();
  const [error, setError] = useError();

  useEffect(() => {
    authStore
      .getAuth()
      .then((receivedAuth) => setAuth(receivedAuth))
      .catch((e) => setError(e));
  }, [setError]);

  return {
    auth: auth ?? null,
    error,
    pending: !auth && !error,
  };
}

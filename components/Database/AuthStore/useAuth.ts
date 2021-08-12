import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useError from "../../Hooks/useError";
import { Scope } from "../../OAuth/Google/scope";
import AuthStore from "./index";

const authStore = AuthStore.getCommonInstance();

export interface AuthResponse {
  auth: CSCAuth | null;
  error: Error | null;
  pending: boolean;
}

export default function useAuth(redirect?: Scope): AuthResponse {
  const router = useRouter();
  const [auth, setAuth] = useState<CSCAuth>();
  const [error, setError] = useError();

  useEffect(() => {
    if (router && router.isReady && !auth && !error)
      void authStore
        .getAuth()
        .then((receivedAuth) => setAuth(receivedAuth))
        .catch((e) => {
          setError(e);

          switch (redirect) {
            case Scope.Student:
              return router.push(
                `/sso/student?redirect=${encodeURIComponent(router.asPath)}`
              );
            case Scope.Teacher:
              return router.push(
                `/sso/teacher?redirect=${encodeURIComponent(router.asPath)}`
              );
            default:
              break;
          }

          return undefined;
        });
  }, [setError, redirect, router, auth, error]);

  return {
    auth: auth ?? null,
    error,
    pending: !auth && !error,
  };
}

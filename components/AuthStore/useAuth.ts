import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { ErrorData } from "../../utilities/useError";
import useError from "../../utilities/useError";
import { Scope } from "../GoogleLoginComponent/LoginComponent";
import { reportException } from "../../utilities/reportExceptionMessage";
import AuthStore from ".";

export default function useAuth(
  redirect = true,
  identity: Scope = Scope.Teacher
): {
  auth: CSCAuth | null;
  error: ErrorData | null;
  recheck: () => Promise<void>;
} {
  const router = useRouter();
  const [error, setError] = useError();
  const [auth, setAuth] = useState<CSCAuth | null>(null);

  const recheck = useCallback(async () => {
    const theAuth = await AuthStore.retrieve();
    const accessData = await theAuth?.getAccessData();

    try {
      if (
        accessData &&
        accessData.exp < Date.now() &&
        (await theAuth?.userInfo())
      ) {
        setAuth(theAuth);
        return;
      }
    } catch (e) {
      reportException(e);
    }

    setError({
      message: "登入憑證到期或是無效。請登出後重新登入。",
      details: JSON.stringify(accessData),
    });
    AuthStore.remove();

    if (redirect) {
      await router.push(
        `/sso/${identity}?redirect=${encodeURIComponent(router.asPath)}`
      );
    }
  }, [setAuth, setError, redirect, identity, router]);

  useEffect(() => {
    void recheck();
  }, [recheck]);

  return { auth, error: error ?? null, recheck };
}

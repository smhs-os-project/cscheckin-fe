import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { ErrorData } from "../../utilities/useError";
import useError from "../../utilities/useError";
import AuthStore from ".";

export default function useAuth(redirect = true): {
  auth: CSCAuth | null;
  error: ErrorData | null;
} {
  const router = useRouter();
  const [error, setError] = useError();
  const [auth, setAuth] = useState<CSCAuth | null>(null);

  useEffect(() => {
    void (async () => {
      const theAuth = await AuthStore.retrieve();
      const accessData = await theAuth?.getAccessData();

      if (accessData && accessData.exp < Date.now()) {
        setAuth(theAuth);
      } else {
        setError({
          message: "登入憑證到期或是無效。請登出後重新登入。",
          details: JSON.stringify(accessData),
        });
        AuthStore.remove();
        // redirect to The login screen
        // TODO: sometimes it is teacher :(
        if (redirect) {
          await router.push(
            `/sso/teacher?redirect=${decodeURIComponent(router.asPath)}`
          );
        }
      }
    })();
  }, []);

  return { auth, error: error ?? null };
}

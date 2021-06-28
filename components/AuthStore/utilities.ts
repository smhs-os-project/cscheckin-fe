import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sentry from "../../utilities/sentry";
import AuthStore from ".";

export async function Logout(): Promise<void> {
  const auth = await AuthStore.retrieve();

  if (auth) await auth.revoke();
  AuthStore.remove();
}

/**
 * @returns [Authentication Object, Loading?, Logout Method]
 */
export function useAuth(
  redirect = true
): [CSCAuth | null, boolean, () => Promise<void>] {
  const router = useRouter();
  const [auth, setAuth] = useState<CSCAuth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const theAuth = await AuthStore.retrieve();
      const accessData = await theAuth?.getAccessData();

      if (accessData && accessData.exp < Date.now()) {
        setAuth(theAuth);
        setLoading(false);
      } else {
        Sentry.captureMessage(
          "AuthStore.utilities.useAuth: The session of this user has been expired or is invalid."
        );
        AuthStore.remove();
        setLoading(false);
        // redirect to The login screen
        // TODO: need improve!
        if (redirect) {
          await router.push(
            `/sso/login?description=登入階段過期或失效。重新登入後自動回到原畫面！&redirect=${encodeURIComponent(
              router.asPath
            )}`
          );
        }
      }
    })();
  });

  async function logout() {
    await Logout();
    setAuth(null);
    await router.push("/");
  }

  return [auth, loading, logout];
}

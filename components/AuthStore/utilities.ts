import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
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
        AuthStore.remove();
        setLoading(false);
        if (redirect) window.location.href = "/"; // redirect to login screen
      }
    })();
  });

  async function logout() {
    await Logout();
    setAuth(null);
  }

  return [auth, loading, logout];
}

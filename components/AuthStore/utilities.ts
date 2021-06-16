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
export function useAuth(): [CSCAuth | null, boolean, () => Promise<void>] {
  const [auth, setAuth] = useState<CSCAuth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void AuthStore.retrieve().then((v) => {
      setAuth(v);
      setLoading(false);
    });
  });

  async function logout() {
    await Logout();
    setAuth(null);
  }

  return [auth, loading, logout];
}

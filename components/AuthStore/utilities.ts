import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import AuthStore from ".";

/**
 * @returns [Authentication Object, Loading?]
 */
export function useAuth(): [CSCAuth | null, boolean] {
  const [auth, setAuth] = useState<CSCAuth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void AuthStore.retrieve().then((v) => {
      setAuth(v);
      setLoading(false);
    });
  });

  return [auth, loading];
}

export async function Logout(): Promise<void> {
  const auth = await AuthStore.retrieve();

  if (auth) await auth.revoke();
  AuthStore.remove();
}

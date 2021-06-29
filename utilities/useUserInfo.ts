import type { AuthIdentRequest } from "cscheckin-js-sdk/dist/types";
import { useEffect, useState } from "react";
import useAuth from "../components/AuthStore/useAuth";
import { Scope } from "../components/GoogleLoginComponent/LoginComponent";

export type UserInfo = AuthIdentRequest;

export default function useUserInfo(): {
  info: UserInfo | null;
  preparing: boolean;
} {
  const { auth } = useAuth(false, Scope.Student);
  const [preparing, setPreparing] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (auth) {
      void (async () => {
        const info = await auth.userInfo();

        setUserInfo(info?.student ?? null);
        setPreparing(false);
      })();
    }
  }, [auth, setUserInfo, setPreparing]);

  return { info: userInfo, preparing };
}

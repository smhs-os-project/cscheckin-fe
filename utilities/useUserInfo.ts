import type { AuthIdentRequest } from "cscheckin-js-sdk/dist/types";
import { useEffect, useState } from "react";
import useAuth from "../components/AuthStore/useAuth";
import { Scope } from "../components/GoogleLoginComponent/LoginComponent";
import { reportException } from "./reportExceptionMessage";

export type UserInfo = AuthIdentRequest;

export default function useUserInfo(): {
  userInfo: UserInfo | null;
  ready: boolean;
} {
  const { auth } = useAuth(false, Scope.Student);
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (auth) {
      void (async () => {
        try {
          const info = await auth.userInfo();
          setUserInfo(info?.student ?? null);
          setReady(true);
        } catch (e) {
          reportException(e, "failed to get user info");
        }
      })();
    }
  }, [auth, setUserInfo, setReady]);

  return { userInfo, ready };
}

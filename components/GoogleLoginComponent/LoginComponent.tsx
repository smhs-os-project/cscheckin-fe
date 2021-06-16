import CSCAuth from "cscheckin-js-sdk/dist/auth";
import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import React, { useEffect, useState } from "react";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import AuthStore from "../AuthStore";
import getSpecifiedClientId from "./getSpecifiedClientId";

export enum Scope {
  Student = "student",
  Teacher = "teacher",
}

const scopeList: Record<Scope, string[]> = {
  teacher: [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.announcements",
  ],
  student: [],
};
export interface LoginComponentProps {
  org: Organization;
  scope: Scope;
  onLogin?: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => Promise<Error | void>;
  onLogout?: () => Promise<Error | void>;
  onFailure?: (error?: unknown) => Promise<void>;
  loginText?: string;
  logoutText?: string;
}

export default function LoginComponent({
  org,
  scope,
  onLogin,
  onLogout,
  onFailure,
  loginText = "登入系統",
  logoutText = "登出系統",
}: LoginComponentProps) {
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null | "??">(null);
  const [hasLogin, setHasLogin] = useState(false);
  const [blocking, setBlocking] = useState(false);

  const theOnFailure: typeof onFailure = async (e) => {
    if (typeof e === "object" && e) setError(JSON.stringify(e));
    else if (typeof e === "string") setError(e);
    else setError("發生內部錯誤。");

    if (onFailure) return onFailure(e);
    return undefined;
  };

  const theOnLogin: typeof onLogin = async (response) => {
    setBlocking(true);
    const resp = response as GoogleLoginResponse;
    if (resp.tokenId) {
      // check if it is a valid GoogleLoginResponse
      const auth = new CSCAuth(org, resp.tokenId, resp.accessToken);
      await AuthStore.store(auth);
    }
    if (onLogin) return onLogin(response);
    return undefined;
  };

  const theOnLogout: typeof onLogout = async () => {
    setBlocking(true);
    const auth = await AuthStore.retrieve();

    if (auth) await auth.revoke();
    AuthStore.remove();

    if (onLogout) return onLogout();
    return undefined;
  };

  const setOrFailure = async (response: Error | void): Promise<void> => {
    if (response instanceof Error) {
      setBlocking(true);
      await theOnFailure(response);
      setHasLogin(false);
    }
    setHasLogin(true);
  };

  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => {
      const auth = await AuthStore.retrieve();
      if (auth) setHasLogin(true);
      setClientId((await getSpecifiedClientId(org)) || "??");
    })();
  });

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (clientId) {
    if (clientId === "??")
      return <div className="error-message">學校名稱錯誤。</div>;

    if (hasLogin)
      return (
        <GoogleLogout
          clientId={clientId}
          disabled={blocking}
          buttonText={logoutText}
          onLogoutSuccess={async () => setOrFailure(await theOnLogout())}
          onFailure={theOnFailure}
          className="w-full sm:w-auto"
        />
      );

    return (
      <GoogleLogin
        clientId={clientId}
        buttonText={loginText}
        disabled={blocking}
        onSuccess={async (response) => setOrFailure(await theOnLogin(response))}
        onFailure={theOnFailure}
        className="w-full sm:w-auto"
        scope={scopeList[scope].join(" ")}
      />
    );
  }

  return <div className="loading">正在設定登入按鈕⋯⋯</div>;
}

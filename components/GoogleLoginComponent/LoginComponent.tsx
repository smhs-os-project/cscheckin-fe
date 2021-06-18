import CSCAuth from "cscheckin-js-sdk/dist/auth";
import type { Organization } from "cscheckin-js-sdk/dist/types";
import React, { useState, useEffect } from "react";

import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import AuthStore from "../AuthStore";
import getSpecifiedClientId from "./getSpecifiedClientId";

enum Stage {
  /**
   * When an operation failed.
   */
  FAILED = -1,
  /**
   * The initial state.
   */
  INIT,
  /**
   * When the client ID has retrieved.
   */
  RETR_CI,
  /**
   * When we are waiting for the login token from Google.
   */
  ON_LOGIN,
  /**
   * When all done.
   */
  COMPLETED,
}

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
  onFailure?: (error?: unknown) => Promise<void>;
  loginText?: string;
}

export default function LoginComponent({
  org,
  scope,
  onLogin,
  onFailure,
  loginText = "登入系統",
}: LoginComponentProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [stage, setStage] = useState(Stage.INIT);
  const [clientId, setClientId] = useState<string | null>(null);

  const theOnFailure: typeof onFailure = async (e) => {
    setStage(Stage.FAILED);
    if (typeof e === "object") setMessage(`發生錯誤：${JSON.stringify(e)}`);
    else if (typeof e === "string") setMessage(`發生錯誤：${e}`);
    else setMessage("發生內部錯誤。");

    if (onFailure) return onFailure(e);
    return undefined;
  };

  const theOnLogin: typeof onLogin = async (response) => {
    setStage(Stage.ON_LOGIN);

    const resp = response as GoogleLoginResponse;
    if (resp.tokenId) {
      // check if it is a valid GoogleLoginResponse
      const auth = new CSCAuth(org, resp.tokenId, resp.accessToken);
      await AuthStore.store(auth);
    }

    if (onLogin) await onLogin(response);
    setStage(Stage.COMPLETED);
    return undefined;
  };

  useEffect(() => {
    void (async () => {
      if (stage === Stage.INIT) {
        setClientId(await getSpecifiedClientId(org));
        setStage(Stage.RETR_CI);
      }
    })();
  });

  switch (stage) {
    case Stage.INIT:
      return <p>正在初始化登入按鈕⋯⋯</p>;
    case Stage.RETR_CI:
    case Stage.ON_LOGIN: {
      if (clientId) {
        return (
          <GoogleLogin
            clientId={clientId}
            buttonText={loginText}
            disabled={stage === Stage.ON_LOGIN}
            onSuccess={async (response) => theOnLogin(response)}
            onFailure={theOnFailure}
            className="w-full sm:w-auto"
            scope={scopeList[scope].join(" ")}
          />
        );
      }
      setMessage(`無此學校名稱 (${org})。`);
      setStage(Stage.FAILED);
      break;
    }
    case Stage.COMPLETED:
      return <p>✅ 登入完成！</p>;
    case Stage.FAILED:
    default:
      break;
  }

  return <p>{message ?? "發生錯誤。"}</p>;
}

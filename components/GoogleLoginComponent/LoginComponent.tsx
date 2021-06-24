import CSCAuth from "cscheckin-js-sdk/dist/auth";
import type { Organization } from "cscheckin-js-sdk/dist/types";
import React, { useState, useEffect } from "react";

import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import Sentry from "../../utilities/sentry";
import AuthStore from "../AuthStore";
import { ErrorMessageEndJsx } from "../MessageConsts";
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

  const transaction = Sentry.startTransaction({
    name: "Google Login Component",
  });

  const theOnFailure: typeof onFailure = async (e) => {
    setStage(Stage.FAILED);
    if (e && typeof e === "object") {
      const castedE = e as { error: string; details?: string };
      if (typeof castedE.error === "string") {
        switch (castedE.error) {
          case "popup_blocked_by_browser":
            setMessage(
              "您使用的瀏覽器不能正常開啟 Google 登入畫面，請檢查是否有阻擋「彈出視窗」。"
            );
            break;
          case "popup_closed_by_user":
            setMessage("請不要關閉 Google 登入彈出視窗！");
            break;
          case "idpiframe_initialization_failed":
            switch (castedE.details) {
              case "Cookies are not enabled in current environment.":
                setMessage("請在您的瀏覽器啟用 Cookie。");
                break;
              default:
                setMessage("發生弔詭問題。(idpiframe_initialization_failed)");
                break;
            }
            break;
          default:
            setMessage("發生弔詭問題。(castedE.error was not matched)");
            break;
        }
      }

      const eJson = JSON.stringify(e);
      Sentry.captureMessage(eJson, Sentry.Severity.Error);
    } else if (e && typeof e === "string") {
      Sentry.captureMessage(JSON.stringify(e), Sentry.Severity.Error);
      setMessage(`發生弔詭問題。(${e})`);
    } else {
      Sentry.captureMessage("發生內部錯誤。", Sentry.Severity.Error);
      setMessage("發生內部錯誤。");
    }

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
      Sentry.captureMessage(`無此學校名稱 (${org})。`);
      setMessage(`無此學校名稱 (${org})。`);
      setStage(Stage.FAILED);
      break;
    }
    case Stage.COMPLETED:
      transaction.finish();
      return <p>✅ 登入完成！</p>;
    case Stage.FAILED:
      transaction.finish();
      break;
    default:
      break;
  }

  return (
    <>
      <p className="break-all w-96">{message ?? "發生錯誤。"}</p>
      <p className="mt-2 break-all w-96">{ErrorMessageEndJsx}</p>
    </>
  );
}

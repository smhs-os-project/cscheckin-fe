import React, { useState, useEffect } from "react";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import { GetClientId } from "cscheckin-js-sdk";
import useSWR from "swr";
import type { OrgInfoResponse } from "cscheckin-js-sdk/dist/types";
import { reportExceptionMessage } from "../../utilities/reportExceptionMessage";
import type { ErrorData } from "../../utilities/useError";
import useError from "../../utilities/useError";
import internalOnErrorWrapper from "./internalOnError";
import internalOnLoginWrapper from "./internalOnLogin";

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
  scope: Scope;
  onFailure: (error: ErrorData) => Promise<void>;
  onLogin?: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => Promise<Error | void>;
  loginText?: string;
}

export default function LoginComponent({
  scope,
  onLogin,
  onFailure,
  loginText = "登入系統",
}: LoginComponentProps) {
  const [clientId, setClientId] = useState<string | null>(null);
  const [error, setError] = useError();
  const { data, error: rError } = useSWR<OrgInfoResponse, unknown>(
    "sdk.auth.client_id",
    GetClientId
  );

  useEffect(() => {
    if (error) {
      reportExceptionMessage(error.message, error.details ?? "");
      if (onFailure) void onFailure(error);
    }
  }, [error, onFailure]);

  useEffect(() => {
    if (data) {
      setClientId(data.client_id);
    } else if (rError instanceof Error) {
      setError({
        message: "無法取得 client id 資料。",
        details: rError.message,
      });
    } else if (typeof rError === "string") {
      setError({
        message: "無法取得 client id 資料。",
        details: rError.toString(),
      });
    } else {
      setError({
        message: "無法取得 client id 資料。",
        details: `未知錯誤：${rError}`,
      });
    }
  }, [data, rError]);

  if (error) {
    return (
      <p>
        發生錯誤！不久後就會跳轉到錯誤頁面。
        如果持續停留在這個頁面，請告知開發者 (SHOULD_REDIRECT_TO_ERROR_PAGE)。
      </p>
    );
  }

  if (clientId) {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText={loginText}
        onSuccess={internalOnLoginWrapper(onLogin)}
        onFailure={internalOnErrorWrapper(setError)}
        className="w-full sm:w-auto"
        scope={scopeList[scope].join(" ")}
      />
    );
  }

  return <p>正在初始化登入按鈕⋯⋯</p>;
}

import React, { useState } from "react";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { getClientIdList } from "./getClientIdList";

export enum Scope {
  Student = "student",
  Teacher = "teacher",
}

const scopeList: Record<Scope, string[]> = {
  teacher: [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.profile.emails",
    "https://www.googleapis.com/auth/classroom.profile.photos",
    "https://www.googleapis.com/auth/classroom.announcements",
  ],
  student: [],
};
export interface LoginComponentProps {
  org: string;
  scope: Scope;
  onLogin: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => Error | void;
  onLogout: () => Error | void;
  onFailure: (error?: unknown) => void;
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
  const clientIdList = getClientIdList();
  const clientId = clientIdList[org];
  const [hasLogin, setHasLogin] = useState(false);
  const setOrFailure = (response: Error | void): void => {
    if (response instanceof Error) {
      onFailure(response);
      setHasLogin(false);
    }
    setHasLogin(true);
  };

  if (clientId) {
    if (hasLogin)
      return (
        <GoogleLogout
          clientId={clientId}
          buttonText={logoutText}
          onLogoutSuccess={() => setOrFailure(onLogout())}
          onFailure={onFailure}
          className="w-full sm:w-auto"
        />
      );

    return (
      <GoogleLogin
        clientId={clientId}
        buttonText={loginText}
        onSuccess={(response) => setOrFailure(onLogin(response))}
        onFailure={onFailure}
        className="w-full sm:w-auto"
        scope={scopeList[scope].join(" ")}
      />
    );
  }

  return <div className="error-message">學校名稱錯誤。</div>;
}

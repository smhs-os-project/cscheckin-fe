import React, { useState } from "react";

import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin, { GoogleLogout } from "react-google-login";

export interface LoginComponentProps {
  onLogin: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => Error | void;
  onLogout: () => Error | void;
  onFailure: (error?: unknown) => void;
}

export default function LoginComponent({
  onLogin,
  onLogout,
  onFailure,
}: LoginComponentProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const [hasLogin, setHasLogin] = useState(false);
  const setOrFailure = (response: Error | void): void => {
    if (response instanceof Error) {
      onFailure(response);
      setHasLogin(false);
    }
    setHasLogin(true);
  };

  if (!clientId)
    throw new Error("You should specify NEXT_PUBLIC_GOOGLE_CLIENT_ID");

  if (hasLogin)
    return (
      <GoogleLogout
        clientId={clientId}
        buttonText="登出系統"
        onLogoutSuccess={() => setOrFailure(onLogout())}
        onFailure={onFailure}
        className="w-full sm:w-auto"
      />
    );

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="登入系統"
      onSuccess={(response) => setOrFailure(onLogin(response))}
      onFailure={onFailure}
      className="w-full sm:w-auto"
    />
  );
}

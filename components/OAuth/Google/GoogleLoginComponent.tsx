import React, { useEffect, useState } from "react";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import { useClientId } from "../../Http/sdk_auth_methods";
import useError from "../../../utilities/ErrorReporting/useError";
import DivItemsCenter from "../../Layout/DivItemsCenter";
import DivLoading from "../../Layout/DivLoading";
import UnexpectedGoogleLoginResponse from "./exceptions/UnexpectedGoogleLoginResponse";
import type { Scope } from "./scope";
import { getScopeInfo } from "./scope";
import type { GoogleLoginError } from "./parseGoogleLoginError";
import { isGoogleLoginError } from "./parseGoogleLoginError";

export interface GoogleLoginComponentProps {
  scope: Scope;
  onError: (error: Error, brief?: GoogleLoginError | null) => void;
  onLogin: (response: GoogleLoginResponse) => void;
}

function isGoogleLoginResponse(
  obj: GoogleLoginResponse | GoogleLoginResponseOffline
): obj is GoogleLoginResponse {
  return "tokenId" in obj && "accessToken" in obj;
}

function GettingClientId() {
  return <DivLoading>正在載入登入背景資訊⋯⋯</DivLoading>;
}

function LoggingInHint() {
  return <DivLoading>正在登入⋯⋯</DivLoading>;
}

export default function GoogleLoginComponent({
  scope,
  onError,
  onLogin,
}: GoogleLoginComponentProps) {
  const [requesting, setRequesting] = useState(false);
  const [glErrorObject, setGlErrorObject] = useState<GoogleLoginError>();
  const [error, setError] = useError();
  const { data: clientId, error: clientIdError, pending } = useClientId();

  useEffect(() => {
    if (error) {
      if (glErrorObject) onError(error, glErrorObject);
      else onError(error);
    }
    if (clientIdError) onError(clientIdError);
  }, [error, clientIdError, onError, glErrorObject]);

  if (pending) return <GettingClientId />;

  if (clientId) {
    return (
      <DivItemsCenter>
        <div className="mr-2">
          <GoogleLogin
            scope={getScopeInfo(scope)}
            clientId={clientId}
            buttonText="登入系統"
            onSuccess={(response) => {
              setRequesting(false);
              if (isGoogleLoginResponse(response)) {
                onLogin(response);
              } else {
                setError(new UnexpectedGoogleLoginResponse(response));
              }
            }}
            onFailure={(e: unknown) => {
              setRequesting(false);
              if (isGoogleLoginError(e)) setGlErrorObject(e);
              setError(e);
            }}
            onRequest={() => setRequesting(true)}
          />
        </div>
        {requesting && <LoggingInHint />}
      </DivItemsCenter>
    );
  }

  return null;
}

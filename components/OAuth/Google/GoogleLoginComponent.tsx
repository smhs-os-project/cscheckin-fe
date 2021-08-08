import React, { useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import { useClientId } from "../../Http/sdk_auth_methods";
import useError from "../../../utilities/ErrorReporting/useError";
import UnexpectedGoogleLoginResponse from "./exceptions/UnexpectedGoogleLoginResponse";

function isGoogleLoginResponse(
  obj: GoogleLoginResponse | GoogleLoginResponseOffline
): obj is GoogleLoginResponse {
  return "tokenId" in obj && "accessToken" in obj;
}

export interface GoogleLoginComponentProps {
  onError: (error: Error) => void;
  onLogin: (response: GoogleLoginResponse) => void;
}

function GettingClientId() {
  return (
    <div className="flex items-center">
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
      <div>正在載入登入按鈕⋯⋯</div>
    </div>
  );
}

export default function GoogleLoginComponent({
  onError,
  onLogin,
}: GoogleLoginComponentProps) {
  const [error, setError] = useError();
  const { data: clientId, error: clientIdError, pending } = useClientId();

  useEffect(() => {
    if (error) onError(error);
    if (clientIdError) onError(clientIdError);
  }, [error, clientIdError, onError]);

  if (pending) return <GettingClientId />;

  if (clientId) {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="登入系統"
        onSuccess={(response) => {
          if (isGoogleLoginResponse(response)) onLogin(response);
          setError(new UnexpectedGoogleLoginResponse());
        }}
        onFailure={(e: unknown) => setError(e)}
      />
    );
  }

  return null;
}

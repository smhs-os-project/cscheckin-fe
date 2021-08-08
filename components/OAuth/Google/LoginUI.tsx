import React, { useEffect, useState } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import useError from "../../../utilities/ErrorReporting/useError";
import AuthStore from "../../Database/AuthStore";
import ErrorPage from "../../Page/ErrorPage";
import HeaderPageCard from "../../Page/HeaderPageCard";
import DivLoading from "../../Layout/DivLoading";
import type { Scope } from "./scope";
import GoogleLoginComponent from "./GoogleLoginComponent";
import parseGoogleLoginError from "./parseGoogleLoginError";

export interface LoginUIProps {
  pageTitle?: string;
  pageDesc?: string;
  pageIcon?: IconDefinition;
  scope: Scope;
}

interface Credential {
  accessToken: string;
  tokenId: string;
}

const authStore = AuthStore.getCommonInstance();

export default function LoginUI({
  pageTitle = "SSO 登入系統",
  pageDesc = "登入本 CSC 簽到系統。",
  pageIcon = faKey,
  scope,
}: LoginUIProps) {
  const [errorBrief, setErrorBrief] = useState("登入時發生錯誤。");
  const [error, setError] = useError();
  const [processing, setProcessing] = useState(false);
  const [credential, setCredential] = useState<Credential>();

  useEffect(() => {
    if (credential)
      authStore.storeCredential(credential.tokenId, credential.accessToken);
  }, [credential]);

  if (error)
    return <ErrorPage errorMessage={errorBrief} errorDetails={error.message} />;

  return (
    <HeaderPageCard title={pageTitle} desc={pageDesc} icon={pageIcon}>
      <div className="m-4 flex space-x-4 items-center">
        <GoogleLoginComponent
          scope={scope}
          onError={(err, brief) => {
            if (brief)
              setErrorBrief(
                (beforeBrief) => parseGoogleLoginError(brief) ?? beforeBrief
              );
            setError(err);
          }}
          onLogin={({ accessToken, tokenId }) => {
            setProcessing(true);
            setCredential({
              accessToken,
              tokenId,
            });
          }}
        />
        {processing && <DivLoading>正在處理中⋯⋯</DivLoading>}
      </div>
    </HeaderPageCard>
  );
}

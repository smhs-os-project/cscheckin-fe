import React from "react";
import ErrorPage from "../../Page/ErrorPage";

export interface AuthErrorPageProps {
  authError: Error;
}

export default function AuthErrorPage({
  authError: { message },
}: AuthErrorPageProps) {
  return <ErrorPage errorMessage="無法進行身份驗證。" errorDetails={message} />;
}

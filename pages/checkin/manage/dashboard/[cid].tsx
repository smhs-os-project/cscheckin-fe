import React from "react";
import useAuth from "../../../../components/Database/AuthStore/useAuth";
import { Scope } from "../../../../components/OAuth/Google/scope";
import useQueryParam from "../../../../components/Hooks/useQueryParam";
import ErrorPage from "../../../../components/Page/ErrorPage";
import AuthErrorPage from "../../../../components/Database/AuthStore/AuthErrorPage";
import LoadingPage from "../../../../components/Page/LoadingPage";
import type AuthenticatedPageProps from "../../../../components/Database/AuthStore/AuthenticatedPageProps";

interface AuthenticatedCheckinManageDashboardProps
  extends AuthenticatedPageProps {
  cid: number;
}

function AuthenticatedCheckinManageDashboard({
  auth,
  cid,
}: AuthenticatedCheckinManageDashboardProps) {
  return null;
}

export default function CheckinManageDashboard() {
  const { auth, error: authError } = useAuth(Scope.Teacher);
  const {
    value: cid,
    loading: cidLoading,
    notSpecified: cidNotSpecified,
  } = useQueryParam("cid");
  const cidNumber = Number(cid);

  if (cidNotSpecified)
    return <ErrorPage errorMessage="未指定要監控的課程 ID。" />;
  if (!cidLoading && Number.isNaN(cidNumber))
    return <ErrorPage errorMessage="課程 ID 應該是組數字。" />;
  if (authError) return <AuthErrorPage authError={authError} />;
  if (auth && Number.isInteger(cidNumber))
    return <AuthenticatedCheckinManageDashboard cid={cidNumber} auth={auth} />;

  return <LoadingPage reason="正在載入監控頁面⋯⋯" />;
}

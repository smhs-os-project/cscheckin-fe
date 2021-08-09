import React, { useEffect } from "react";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import useAuth from "../../components/Database/AuthStore/useAuth";
import { Scope } from "../../components/OAuth/Google/scope";
import type AuthenticatedPageProps from "../../components/Database/AuthStore/AuthenticatedPageProps";
import { useCheckin } from "../../components/Http/sdk_checkin_methods";
import useQueryParam from "../../components/Hooks/useQueryParam";
import LoadingPage from "../../components/Page/LoadingPage";
import ErrorPage from "../../components/Page/ErrorPage";
import AuthErrorPage from "../../components/Database/AuthStore/AuthErrorPage";

const CheckedIn = dynamic(
  () => import("../../components/Page/CheckinPage/CheckedIn")
);

interface PreparedCSCStudentCheckinProps extends AuthenticatedPageProps {
  uuid: string;
}

export function AuthenticatedCSCStudentCheckin({
  auth,
  uuid,
}: PreparedCSCStudentCheckinProps) {
  const { data, error } = useCheckin(uuid, auth);

  if (error)
    return (
      <ErrorPage
        errorMessage="您未加入這間教室，或已經結束簽到。"
        errorDetails={error.message}
      />
    );

  if (data) {
    return <CheckedIn auth={auth} checkinData={data} />;
  }

  return <LoadingPage reason="正在簽到⋯⋯" />;
}

export default function CSCStudentCheckin() {
  const { auth, error } = useAuth(Scope.Student);
  const {
    value: uuid,
    loading,
    notSpecified: uuidNotSpecified,
  } = useQueryParam("uuid");

  useEffect(() => {
    if (!loading && auth) NProgress.done();
    else NProgress.start();
  }, [auth, loading]);

  if (error) return <AuthErrorPage authError={error} />;

  if (uuidNotSpecified)
    return <ErrorPage errorMessage="未指定課程的唯一編號。" />;

  if (auth && uuid) {
    return <AuthenticatedCSCStudentCheckin auth={auth} uuid={uuid} />;
  }

  return <LoadingPage reason="正在準備簽到介面⋯⋯" />;
}

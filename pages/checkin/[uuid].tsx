import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useAuth from "../../components/Database/AuthStore/useAuth";
import { Scope } from "../../components/OAuth/Google/scope";
import type AuthenticatedPageProps from "../../components/Database/AuthStore/AuthenticatedPageProps";
import { useCheckin } from "../../components/Http/sdk_checkin_methods";
import useQueryParam from "../../components/Hooks/useQueryParam";
import LoadingPage from "../../components/Page/LoadingPage";
import ErrorPage from "../../components/Page/ErrorPage";
import AuthErrorPage from "../../components/Database/AuthStore/AuthErrorPage";
import { useUserInfo } from "../../components/Http/sdk_auth_methods";

const CheckedIn = dynamic(
  () => import("../../components/Page/CheckinPage/CheckedIn")
);

interface PreparedCSCStudentCheckinProps extends AuthenticatedPageProps {
  uuid: string;
}

function AuthenticatedCheckin({ auth, uuid }: PreparedCSCStudentCheckinProps) {
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

function CheckingStudentClassNumber({
  auth,
  uuid,
}: PreparedCSCStudentCheckinProps) {
  const router = useRouter();
  const { data, error, pending } = useUserInfo(auth);
  const hasSetUpStudentInfo = !!data?.student;

  useEffect(() => {
    if (router.isReady && !pending && !hasSetUpStudentInfo) {
      void router.push(
        `/config/info?redirect=${encodeURIComponent(
          `${router.asPath}?_has_set_up_student_info=yes`
        )}`
      );
    }
  }, [router, pending, hasSetUpStudentInfo]);

  if (error)
    return (
      <ErrorPage
        errorMessage="無法取得使用者資訊。"
        errorDetails={error.message}
      />
    );

  if (hasSetUpStudentInfo)
    return <AuthenticatedCheckin uuid={uuid} auth={auth} />;

  return <LoadingPage reason="正在檢查班級座號設定⋯⋯" />;
}

export default function CSCStudentCheckin() {
  const { auth, error } = useAuth(Scope.Student);
  const { value: uuid, notSpecified: uuidNotSpecified } = useQueryParam("uuid");
  const {
    value: hasSetupStudentInfoFlag,
    loading: hasSetupStudentInfoFlagLoading,
  } = useQueryParam("_has_set_up_student_info");

  if (error) return <AuthErrorPage authError={error} />;

  if (uuidNotSpecified)
    return <ErrorPage errorMessage="未指定課程的唯一編號。" />;

  if (auth && uuid && !hasSetupStudentInfoFlagLoading) {
    // if the query parameter "_has_set_up_student_info" is "yes"
    if (hasSetupStudentInfoFlag === "yes") {
      // check in
      return <AuthenticatedCheckin uuid={uuid} auth={auth} />;
    }

    // otherwise, checking if the student has set up class and number first.
    return <CheckingStudentClassNumber auth={auth} uuid={uuid} />;
  }

  return <LoadingPage reason="正在準備簽到介面⋯⋯" />;
}

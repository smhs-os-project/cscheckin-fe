import React, { useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import useAuth from "../../../../components/Database/AuthStore/useAuth";
import { Scope } from "../../../../components/OAuth/Google/scope";
import useQueryParam from "../../../../components/Hooks/useQueryParam";
import ErrorPage from "../../../../components/Page/ErrorPage";
import AuthErrorPage from "../../../../components/Database/AuthStore/AuthErrorPage";
import LoadingPage from "../../../../components/Page/LoadingPage";
import type AuthenticatedPageProps from "../../../../components/Database/AuthStore/AuthenticatedPageProps";
import {
  useCourseInfoById,
  useCourseShareLink,
  useCourseStatusById,
} from "../../../../components/Http/sdk_course_methods";
import { useCheckinList } from "../../../../components/Http/sdk_checkin_methods";
import BasePage from "../../../../components/Page/BasePage";

const Dashboard = dynamic(
  () => import("../../../../components/Page/Dashboard/Dashboard")
);

interface AuthenticatedCheckinManageDashboardProps
  extends AuthenticatedPageProps {
  courseId: number;
}

const fireError = async (errorBrief: string, errorMessage: string) =>
  Swal.fire(
    errorBrief,
    `<p>請檢查進入的課程是否正確，或者是否登錯帳號。<br />
          若登錯帳號，請回到主畫面登出，或者是重開新分頁。</p>
          <pre>${errorMessage}</pre>`,
    "warning"
  );

function AuthenticatedCheckinManageDashboard({
  auth,
  courseId,
}: AuthenticatedCheckinManageDashboardProps) {
  const linkResponse = useCourseShareLink(courseId, auth);
  const courseInfo = useCourseInfoById(courseId, auth);
  const courseStatus = useCourseStatusById(courseId, auth);
  const checkinList = useCheckinList(courseId, auth);
  const studentsInfo = useMemo(
    () =>
      checkinList.data?.map((student) => ({
        status: student.state,
        userClass: student.class,
        userNo: student.number,
        userName: student.name,
        checkedInAt:
          typeof student.created_at === "string"
            ? undefined
            : student.created_at,
      })) ?? [],
    [checkinList]
  );

  // error handlers
  useEffect(() => {
    if (linkResponse.error) {
      void fireError("無法取得簽到連結。", linkResponse.error.message);
    } else if (courseInfo.error) {
      void fireError("無法載入課程資訊。", courseInfo.error.message);
    } else if (courseStatus.error) {
      void fireError("無法載入課程狀態。", courseStatus.error.message);
    } else if (checkinList.error) {
      void fireError("無法載入學生名單。", checkinList.error.message);
    }
  }, [
    linkResponse.error,
    courseInfo.error,
    courseStatus.error,
    checkinList.error,
  ]);

  // loading
  useEffect(() => {
    if (
      linkResponse.pending ||
      courseInfo.pending ||
      courseStatus.pending ||
      checkinList.pending
    ) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [
    linkResponse.pending,
    courseInfo.pending,
    courseStatus.pending,
    checkinList.pending,
  ]);

  return (
    <BasePage title="簽到連結監控面板">
      <Dashboard
        link={linkResponse.data?.link ?? ""}
        status={courseStatus.data ?? undefined}
        auth={auth}
        studentsInfo={studentsInfo}
        classroomId={courseInfo.data?.google_classroom_id ?? ""}
        courseId={courseId}
      />
    </BasePage>
  );
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
    return (
      <AuthenticatedCheckinManageDashboard courseId={cidNumber} auth={auth} />
    );

  return <LoadingPage reason="正在載入監控頁面⋯⋯" />;
}

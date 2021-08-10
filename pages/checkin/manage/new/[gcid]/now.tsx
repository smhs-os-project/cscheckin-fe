import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types";
import { CreateCourse } from "cscheckin-js-sdk";
import useQueryParam from "../../../../../components/Hooks/useQueryParam";
import type AuthenticatedPageProps from "../../../../../components/Database/AuthStore/AuthenticatedPageProps";
import LoadingPage from "../../../../../components/Page/LoadingPage";
import ErrorPage from "../../../../../components/Page/ErrorPage";
import useAuth from "../../../../../components/Database/AuthStore/useAuth";
import { Scope } from "../../../../../components/OAuth/Google/scope";
import AuthErrorPage from "../../../../../components/Database/AuthStore/AuthErrorPage";
import useError from "../../../../../utilities/ErrorReporting/useError";

interface AuthenticatedCheckinManageNewCourseNowProps
  extends AuthenticatedPageProps {
  classroomId: string;
}

function AuthenticatedCheckinManageNewCourseNow({
  classroomId,
  auth,
}: AuthenticatedCheckinManageNewCourseNowProps) {
  const router = useRouter();
  const [error, setError] = useError();
  const [data, setData] = useState<CourseResponse>();

  useEffect(() => {
    if (!data && !error)
      void CreateCourse(
        classroomId,
        {
          start_timestamp: new Date(),
          late_time: "00:15:00",
          expire_time: "01:00:00",
        },
        auth
      )
        .then((response) => setData(response))
        .catch((recvError: unknown) => setError(recvError));
  }, [auth, classroomId, setError, data, error]);

  useEffect(() => {
    if (data) {
      void router.push(`/checkin/manage/dashboard/${data.id}`);
    }
  }, [data, error, router]);

  if (error)
    return (
      <ErrorPage errorMessage="無法建立簽到連結" errorDetails={error.message} />
    );

  return <LoadingPage reason="正在建立簽到連結⋯⋯" />;
}

export default function CheckinManageNewCourseNow() {
  const { value: classroomId, notSpecified: classroomIdNotSpecified } =
    useQueryParam("gcid");
  const { auth, error: authError } = useAuth(Scope.Teacher);

  if (classroomIdNotSpecified)
    return <ErrorPage errorMessage="未指定要建立的 Classroom 教室。" />;
  if (authError) return <AuthErrorPage authError={authError} />;
  if (classroomId && auth)
    return (
      <AuthenticatedCheckinManageNewCourseNow
        classroomId={classroomId}
        auth={auth}
      />
    );

  return <LoadingPage reason="正在初始化簽到連結建立程序⋯⋯" />;
}

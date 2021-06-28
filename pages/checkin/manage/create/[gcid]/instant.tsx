import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CreateCourse } from "cscheckin-js-sdk";
import useSWR from "swr";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types";
import HeaderPageCard from "../../../../../components/Page/HeaderPageCard";
import RefreshButton from "../../../../../components/BaseElements/RefreshButton";
import useAuth from "../../../../../components/AuthStore/useAuth";
import useError from "../../../../../utilities/useError";
import ErrorPage from "../../../../../components/Page/ErrorPage";

export function useGcid() {
  const router = useRouter();
  const { gcid } = router.query;

  if (typeof gcid === "string") return gcid;
  return null;
}

export default function CSCCheckinManageCreateCourseInstant() {
  const router = useRouter();
  const gcid = useGcid();
  const { auth, error: authError } = useAuth(false);
  const [error, setError] = useError();
  const { data, error: courseError } = useSWR<CourseResponse | null, unknown>(
    ["course.create_course", auth, gcid],
    async (_, inAuth, inGcid) => {
      if (inAuth && typeof inGcid === "string")
        return CreateCourse(
          inGcid,
          {
            start_timestamp: new Date(),
            late_time: "00:10:00", // TODO
            expire_time: "00:50:00", // TODO
          },
          inAuth
        );
      return null;
    }
  );

  useEffect(() => {
    if (data) {
      void router.push(`/checkin/manage/dashboard/${data.id}`);
    }
  }, [data]);

  useEffect(() => {
    if (courseError instanceof Error) {
      setError({
        message: "無法建立課程。",
        details: courseError.message,
      });
    } else if (courseError) {
      setError({
        message: "無法建立課程。",
        details: `${courseError}`,
      });
    }
  }, [courseError]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  if (error)
    return (
      <ErrorPage
        errorMessage={error.message}
        errorDetails={error.details ?? "未指定詳細資訊。"}
      />
    );

  return (
    <HeaderPageCard
      id="csc-manage-create-course-instant"
      title="正在建立 Classroom 課程⋯⋯"
      desc="很快就會完成。"
      icon={faSpinner}
    >
      <p>如長時間無反應，請點選下方按鈕重新整理。</p>
      <p>若問題持續，請按右下角「回報問題」告知我們。</p>
      <RefreshButton className="mt-3" />
    </HeaderPageCard>
  );
}

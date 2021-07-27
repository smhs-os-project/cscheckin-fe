import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CreateCourse } from "cscheckin-js-sdk";
import useSWR from "swr";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types";
import NProgress from "nprogress";
import HeaderPageCard from "../../../../../components/Page/HeaderPageCard";
import RefreshButton from "../../../../../components/Elements/Button/RefreshButton";
import useAuth from "../../../../../components/AuthStore/useAuth";
import useError from "../../../../../utilities/useError";
import ErrorPage from "../../../../../components/Page/ErrorPage";
import { useConfig } from "../../../../../components/LocalDB/utilities";
import {
  END_DURATION,
  END_DURATION_DEFAULT,
  LATE_DURATION,
  LATE_DURATION_DEFAULT,
} from "../../../../../components/LocalDB/consts";

function InnerCSCCheckinManageCreateCourseInstant({
  gcid,
  lateTime,
  endTime,
}: {
  gcid: string;
  lateTime: string;
  endTime: string;
}) {
  const router = useRouter();
  const { auth, error: authError } = useAuth();
  const [error, setError] = useError();

  const { data, error: courseError } = useSWR<CourseResponse | null, unknown>(
    ["course.create_course", auth, gcid],
    async (_, inAuth: typeof auth, inGcid: typeof gcid) => {
      if (inAuth)
        return CreateCourse(
          inGcid,
          {
            start_timestamp: new Date(),
            late_time: lateTime,
            expire_time: endTime,
          },
          inAuth
        );
      return null;
    }
  );

  useEffect(() => {
    if (data) {
      NProgress.done();
      void router.push(`/checkin/manage/dashboard/${data.id}`);
    }
  }, [data, router]);

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
  }, [courseError, setError]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError, setError]);

  if (error) {
    NProgress.done();
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  NProgress.start();
  return (
    <HeaderPageCard
      id="csc-manage-create-course-instant"
      title="正在建立 Classroom 課程⋯⋯"
      desc="很快就會完成。"
      icon={faSpinner}
    >
      <p>如超過 10 秒無反應，請點選下方按鈕重新整理。</p>
      <p>若問題持續，請按右下角「回報問題」告知我們。</p>
      <RefreshButton className="mt-3" />
    </HeaderPageCard>
  );
}
export default function CSCCheckinManageCreateCourseInstant() {
  const router = useRouter();
  const { gcid } = router.query;
  const [lateTimeConfig, , ltReady] = useConfig(LATE_DURATION);
  const [endTimeConfig, , etReady] = useConfig(END_DURATION);

  if (!router.isReady || !ltReady || !etReady) {
    return <p>正在初始化資料⋯⋯</p>;
  }

  if (!(typeof gcid === "string")) {
    return (
      <ErrorPage
        errorMessage="傳入的 classroom id 無效。"
        errorDetails={`傳入的 classroom id 是 ${gcid?.join(
          ","
        )}，不是有效字串。`}
      />
    );
  }

  return (
    <InnerCSCCheckinManageCreateCourseInstant
      gcid={gcid}
      lateTime={lateTimeConfig ?? LATE_DURATION_DEFAULT}
      endTime={endTimeConfig ?? END_DURATION_DEFAULT}
    />
  );
}

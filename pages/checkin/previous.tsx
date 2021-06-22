import React, { useState, useEffect } from "react";
import type { CourseListResponse } from "cscheckin-js-sdk/dist/types";
import { CourseListResponseSchema } from "cscheckin-js-sdk/dist/types";
import { GetCoursesList } from "cscheckin-js-sdk";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";
import { useAuth } from "../../components/AuthStore/utilities";
import Sentry from "../../utilities/sentry";

export default function CheckinPrevious() {
  const pageId = "checkin-choose-previous";
  const pageTitle = "選擇以往的簽到紀錄";
  const pageDesc = "選擇要查看以往的簽到紀錄。";

  const router = useRouter();
  const [auth, loading] = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [previous, setPrevious] = useState<CourseListResponse>([]);

  useEffect(() => {
    if (auth) {
      void GetCoursesList(auth).then((rawCourse) => {
        const course = CourseListResponseSchema.try(rawCourse);

        if (course instanceof ValidationError) {
          Sentry.captureMessage(
            `無法取得以往的簽到紀錄: ${JSON.stringify(rawCourse)}`,
            Sentry.Severity.Error
          );
          Sentry.captureException(course);
          setMessage("無法取得以往的簽到紀錄。");
        } else {
          setPrevious(course);
          setMessage(null);
        }
      });
    } else if (!loading) {
      Sentry.captureMessage("未登入。", Sentry.Severity.Info);
      setMessage("未登入。");
    } else {
      setMessage("正在取得以往的簽到紀錄⋯⋯");
    }
  }, [auth, loading]);

  return (
    <ListChoicePageCard
      id={pageId}
      title={pageTitle}
      desc={pageDesc}
      message={message}
    >
      {previous.reverse().map(({ name, id, start_timestamp: st }) => ({
        id: id.toString(),
        name: `${name} - ${st.toLocaleDateString()}`,
        redirect: async () => router.push(`/checkin/monitor?id=${id}`),
      }))}
    </ListChoicePageCard>
  );
}

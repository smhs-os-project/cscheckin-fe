import React, { useState, useEffect } from "react";

import type { CourseListResponse } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { CourseListResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { GetCoursesList } from "cscheckin-js-sdk";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";
import { useAuth } from "../../components/AuthStore/utilities";

export default function CheckinPrevious() {
  const pageId = "checkin-choose-previous";
  const pageTitle = "選擇過去紀錄";
  const pageDesc = "選擇要查看的過去記錄。";

  const router = useRouter();
  const [auth, loading] = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [previous, setPrevious] = useState<CourseListResponse>([]);

  useEffect(() => {
    if (auth) {
      void GetCoursesList(auth).then((rawCourse) => {
        const course = CourseListResponseSchema.try(rawCourse);

        if (course instanceof ValidationError) {
          setMessage("無法取得過去紀錄。");
        } else {
          setPrevious(course);
          setMessage(null);
        }
      });
    } else if (!loading) {
      setMessage("未登入。");
    } else {
      setMessage("正在取得過去紀錄⋯⋯");
    }
  }, [auth, loading]);

  return (
    <ListChoicePageCard
      id={pageId}
      title={pageTitle}
      desc={pageDesc}
      message={message}
    >
      {previous.map(({ name, id }) => ({
        id: id.toString(),
        name,
        redirect: async () => router.push(`/checkin/common/${id}/monitor`),
      }))}
    </ListChoicePageCard>
  );
}

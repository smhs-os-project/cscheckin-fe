import { CreateCourse, GetClassroomsList } from "cscheckin-js-sdk";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import type { GClassroomListResponse } from "cscheckin-js-sdk/dist/types";
import {
  GClassroomListResponseSchema,
  CourseResponseSchema,
} from "cscheckin-js-sdk/dist/types";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import { useAuth } from "../../../../components/AuthStore/useAuth";
import ListChoicePageCard from "../../../../components/Page/ListChoicePageCard";
import Sentry from "../../../../utilities/sentry";

export default function CheckinCreate() {
  const pageId = "checkin-choose-classroom";
  const pageTitle = "選擇 Classroom 教室";
  const pageDesc = "選擇要設定簽到的 Classroom。";

  const router = useRouter();
  const [auth, loading] = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [classroom, setClassroom] = useState<GClassroomListResponse>([]);

  useEffect(() => {
    if (auth) {
      void GetClassroomsList(auth).then((crRaw) => {
        const cr = GClassroomListResponseSchema.try(crRaw);

        if (cr instanceof ValidationError) {
          Sentry.captureMessage(
            "無法取得 Classroom 教室名單。",
            Sentry.Severity.Error
          );
          setMessage("無法取得 Classroom 教室名單。");
          NProgress.done();
          return;
        }

        setClassroom(cr);
        setMessage(null);
        NProgress.done();
      });
    } else if (!auth && !loading) {
      Sentry.captureMessage("權限不足。", Sentry.Severity.Warning);
      setMessage("權限不足。");
    } else {
      NProgress.start();
      // Sentry.captureMessage("正在搜尋 Classroom 教室⋯⋯", Sentry.Severity.Debug);
      setMessage("正在搜尋 Classroom 教室⋯⋯");
    }
  }, [auth, loading]);

  return (
    <ListChoicePageCard
      id={pageId}
      title={pageTitle}
      desc={pageDesc}
      message={message}
    >
      {classroom.map((cr) => ({
        id: cr.name,
        name: cr.name,
        redirect: async () => {
          NProgress.start();
          if (auth) {
            const rawCourse = await CreateCourse(
              cr.google_classroom_id,
              {
                start_timestamp: new Date(),
                late_time: "00:10:00", // TODO
                expire_time: "00:50:00", // TODO
              },
              auth
            );
            const course = CourseResponseSchema.try(rawCourse);

            if (course instanceof ValidationError) {
              Sentry.captureMessage(
                "無法建立課程簽到連結。請稍後重試。",
                Sentry.Severity.Warning
              );
              setMessage("無法建立課程簽到連結。請稍後重試。");
            } else {
              await router.push(`/checkin/monitor?id=${course.id}`);
            }
          } else {
            Sentry.captureMessage(
              "建立簽到連結中途遇到權限不足問題。請回到主畫面登出後重新登入。",
              Sentry.Severity.Warning
            );
            setMessage(
              "建立簽到連結中途遇到權限不足問題。請回到主畫面登出後重新登入。"
            );
          }
          NProgress.done();
        },
      }))}
    </ListChoicePageCard>
  );
}

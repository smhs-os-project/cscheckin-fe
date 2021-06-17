import { GetCourse, Checkin as StudentCheckinMethod } from "cscheckin-js-sdk";
import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import type { StudentCheckinResponse } from "cscheckin-js-sdk/dist/types/student/resp_checkin";
import { StudentCheckinResponseSchema } from "cscheckin-js-sdk/dist/types/student/resp_checkin";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { CourseResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NProgress from "nprogress";
import LoginComponent, {
  Scope,
} from "../../../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../../../components/Page/HeaderPageCard";
import AuthStore from "../../../../components/AuthStore";

enum Stage {
  FAILED = -1,
  PREPARE,
  LOGIN,
  CHECK_IF_REGISTER,
  REQUIRE_TO_REGISTER,
  CHECK_IN,
  SUCCESS,
}

export default function Checkin() {
  const pageId = "student-checkin";
  const pageTitle = "學生簽到系統";

  const router = useRouter();
  const { org, uuid, stage: recvStage } = router.query;
  const [stage, setStage] = useState(Stage.PREPARE);
  const [message, setMessage] = useState<string | null>(null);
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [checkinInfo, setCheckinInfo] = useState<StudentCheckinResponse | null>(
    null
  );

  /* NProgress */
  useEffect(() => {
    switch (stage) {
      case Stage.PREPARE:
      case Stage.CHECK_IF_REGISTER:
      case Stage.CHECK_IN:
        NProgress.start();
        break;
      case Stage.FAILED:
      case Stage.LOGIN:
      case Stage.REQUIRE_TO_REGISTER:
      case Stage.SUCCESS:
      default:
        NProgress.done();
        break;
    }
  }, [stage]);

  // logic
  useEffect(() => {
    switch (stage) {
      case Stage.PREPARE: {
        if (!(typeof org === "string" && typeof uuid === "string")) {
          return undefined; // router needs a while to get the query data
        }

        void GetCourse(uuid)
          .then((rCourse) => {
            const cs = CourseResponseSchema.try(rCourse);

            if (cs instanceof ValidationError) {
              console.error(rCourse);
              return Promise.reject(new Error("課程不存在或尚未開放。"));
            }

            if (typeof recvStage === "string" && /^\d+$/.exec(recvStage)) {
              setStage(Number(recvStage) as Stage);
            } else {
              setCourse(cs);
              setStage(Stage.LOGIN);
              setMessage(null);
            }

            return undefined;
          })
          .catch((error: Error) => {
            setMessage(error.message);
            setStage(Stage.FAILED);
          });

        break;
      }
      case Stage.CHECK_IF_REGISTER: {
        void AuthStore.retrieve()
          .then((auth) => {
            if (!auth)
              return Promise.reject(new Error("無法取得身份識別資訊。"));
            return auth.userInfo();
          })
          .then((userInfo) => {
            if (userInfo?.student) setStage(Stage.CHECK_IN);
            else setStage(Stage.REQUIRE_TO_REGISTER);
          })
          .catch((error: Error) => {
            setMessage(error.message);
            setStage(Stage.FAILED);
          });
        break;
      }
      case Stage.REQUIRE_TO_REGISTER:
        void router.push(`/register?redirect='/checkin/${org}/${uuid}?stage=4`);
        break;
      case Stage.CHECK_IN:
        void AuthStore.retrieve()
          .then((auth) => {
            if (!auth)
              return Promise.reject(new Error("無法取得身份識別資訊。"));
            if (!course) return Promise.reject(new Error("無法取得課程資訊。"));

            return StudentCheckinMethod(course.id, auth);
          })
          .then((rCheckin) => {
            const checkin = StudentCheckinResponseSchema.try(rCheckin);

            if (checkin instanceof ValidationError) {
              return Promise.reject(new Error("簽到失敗。"));
            }

            setCheckinInfo(checkin);
            setStage(Stage.SUCCESS);
            return Promise.resolve();
          })
          .catch((error: Error) => {
            setMessage(error.message);
            setStage(Stage.FAILED);
          });
        break;
      default:
        break;
    }

    return undefined;
  }, [stage, org, uuid]);

  // views
  switch (stage) {
    case Stage.LOGIN:
      if (course) {
        return (
          <HeaderPageCard
            id={pageId}
            title={pageTitle}
            desc={`簽到${course?.name}。`}
          >
            <LoginComponent
              // we assumed user sent the valid organization,
              // since we will check if it is valid within LoginComponent.
              org={org as Organization}
              scope={Scope.Student}
              onLogin={async () => {
                setStage(Stage.CHECK_IF_REGISTER);
              }}
              loginText="點此簽到"
            />
          </HeaderPageCard>
        );
      }
      setMessage("無法擷取課程資訊。");
      setStage(Stage.FAILED);
      break;
    case Stage.SUCCESS:
      if (checkinInfo) {
        return (
          <HeaderPageCard
            id={pageId}
            title={pageTitle}
            desc="簽到完成。您可留下本憑證以示證明。"
          >
            <p>簽到時間：{checkinInfo.updated_at}</p>
            <p>識別 ID：{checkinInfo?.course_id}</p>
          </HeaderPageCard>
        );
      }

      setMessage("無法取得簽到後續。");
      setStage(Stage.FAILED);
      break;
    default:
      break;
  }

  return (
    <HeaderPageCard id={pageId} title={pageTitle} desc="發生錯誤。">
      <p>{message}</p>
    </HeaderPageCard>
  );
}

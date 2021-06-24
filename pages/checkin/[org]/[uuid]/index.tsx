import {
  Checkin as StudentCheckinMethod,
  GetCourseByUUID,
  isBefore,
} from "cscheckin-js-sdk";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types";
import { CourseResponseSchema } from "cscheckin-js-sdk/dist/types";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NProgress from "nprogress";
import HeaderPageCard from "../../../../components/Page/HeaderPageCard";
import AuthStore from "../../../../components/AuthStore";
import catcherBuilder from "../../../../utilities/catcher";
import Sentry from "../../../../utilities/sentry";
import { useAuth } from "../../../../components/AuthStore/utilities";

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
  const [userAuth, loading] = useAuth(false);
  const { org, uuid, skip_login: skipLogin } = router.query;
  const [stage, setStage] = useState(Stage.PREPARE);
  const [message, setMessage] = useState<string | null>(null);
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [hasLogout, setHasLogout] = useState(false);

  const catcher = catcherBuilder(setMessage, () => {
    setStage(Stage.FAILED);
  });

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

        void GetCourseByUUID(uuid)
          .then((rCourse) => {
            const cs = CourseResponseSchema.try(rCourse);

            if (cs instanceof ValidationError) {
              Sentry.captureMessage(
                `課程不存在或尚未開放：${JSON.stringify(rCourse)}`
              );
              Sentry.captureException(cs);
              return Promise.reject(new Error("課程不存在或尚未開放。"));
            }

            if (isBefore(cs.start_timestamp, cs.expire_time)) {
              return Promise.reject(new Error("課程已經結束簽到。"));
            }

            setCourse(cs);
            if (typeof skipLogin === "string" && skipLogin === "1") {
              setStage(Stage.CHECK_IF_REGISTER);
            } else {
              setStage(Stage.LOGIN);
              setMessage(null);
            }

            return undefined;
          })
          .catch(catcher);

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
          .catch(catcher);
        break;
      }
      case Stage.REQUIRE_TO_REGISTER:
        void router.push(
          `/config/register?redirect=${encodeURIComponent(
            `/checkin/${org}/${uuid}`
          )}?skip_login=1`
        );
        break;
      case Stage.CHECK_IN:
        void AuthStore.retrieve()
          .then((auth) => {
            if (!auth)
              return Promise.reject(new Error("無法取得身份識別資訊。"));
            if (!course) return Promise.reject(new Error("無法取得課程資訊。"));

            return StudentCheckinMethod(course.uuid, auth);
          })
          .then((checkin) => {
            if (checkin) {
              setStage(Stage.SUCCESS);
              return Promise.resolve();
            }

            return Promise.reject(
              new Error("簽到失敗。可能是因為課程已經結束，或是尚未開課。")
            );
          })
          .catch(catcher);
        break;
      case Stage.SUCCESS:
        if (hasLogout === false) {
          AuthStore.retrieve()
            .then((auth) => auth?.revoke())
            .finally(() => {
              AuthStore.remove();
              setHasLogout(true);
            });
        }
        break;
      default:
        break;
    }

    return undefined;
  }, [stage, org, uuid, hasLogout]);

  // views
  switch (stage) {
    case Stage.LOGIN:
      if (!userAuth && !loading) {
        if (course && typeof org === "string" && typeof uuid === "string") {
          void router.push(
            `/sso/login?title=${encodeURIComponent(
              `簽到「${course.name}」課程`
            )}&description=${encodeURIComponent(
              "登入您學校的 Google 帳戶即完成簽到。可能需要輸入您的班級座號。"
            )}&org=${org}scope=student&redirect=${encodeURIComponent(
              `/checkin/${org}/${uuid}`
            )}`
          );
        } else {
          Sentry.captureMessage(
            "Stage.LOGIN: 無法擷取課程資訊。",
            Sentry.Severity.Error
          );
          setMessage("無法擷取課程資訊。");
          setStage(Stage.FAILED);
          break;
        }
      } else if (userAuth) {
        setStage(Stage.CHECK_IF_REGISTER);
        break;
      }

      return null; // loading
    case Stage.SUCCESS:
      return (
        <HeaderPageCard
          id={pageId}
          title={pageTitle}
          desc="簽到完成。您可留下本憑證以示證明。"
        >
          <p>簽到時間：{new Date().toLocaleString()}</p>
        </HeaderPageCard>
      );
    case Stage.FAILED:
      break;
    default:
      return null;
  }

  return (
    <HeaderPageCard id={pageId} title={pageTitle} desc="發生錯誤。">
      <p>{message}</p>
    </HeaderPageCard>
  );
}

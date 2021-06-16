import { GetCourse } from "cscheckin-js-sdk";
import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import { CourseResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

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
  const pageId = "student-checkin-portal";
  const pageTitle = "學生簽到系統";

  const router = useRouter();
  const { org, uuid } = router.query;
  const [stage, setStage] = useState(Stage.PREPARE);
  const [message, setMessage] = useState<string | null>(null);
  const [courseName, setCourseName] = useState("");

  switch (stage) {
    case Stage.PREPARE: {
      if (!(typeof org === "string" && typeof uuid === "string")) {
        return null; // router needs a while to get the query data
      }

      void GetCourse(uuid)
        .then((course) => {
          const cs = CourseResponseSchema.try(course);

          if (cs instanceof ValidationError) {
            console.error(course);
            return Promise.reject(new Error("課程不存在或尚未開放。"));
          }

          setStage(Stage.LOGIN);
          setCourseName(cs.name);
          setMessage(null);
          return undefined;
        })
        .catch((error: Error) => {
          setStage(Stage.FAILED);
          setMessage(error.message);
        });
      break;
    }
    case Stage.LOGIN:
      return (
        <HeaderPageCard
          id={pageId}
          title={pageTitle}
          desc={`簽到${courseName}。`}
        >
          {message ? (
            <p>{message}</p>
          ) : (
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
          )}
        </HeaderPageCard>
      );
    case Stage.CHECK_IF_REGISTER:
      setStage(Stage.CHECK_IN); // TODO
      break;
    case Stage.REQUIRE_TO_REGISTER:
      void router.push(`/register?redirect='/checkin/${org}/${uuid}?stage=4`);
      break;
    case Stage.CHECK_IN:
      setStage(Stage.SUCCESS); // TODO
      break;
    case Stage.SUCCESS:
      void router.push("/checkin/success");
      break;
    default:
      // Stage.FAILED
      break;
  }

  return (
    <HeaderPageCard id={pageId} title={pageTitle} desc="發生錯誤。">
      <p>{message}</p>
    </HeaderPageCard>
  );
}

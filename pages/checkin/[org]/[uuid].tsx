import { GetCourse } from "cscheckin-js-sdk";
import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import { CourseResponseSchema } from "cscheckin-js-sdk/dist/types/course/resp_course";
import { ValidationError } from "myzod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

export default function Checkin() {
  const router = useRouter();
  const { org, uuid } = router.query;
  const [message, setMessage] = useState<string | null>(null);
  const [courseName, setCourseName] = useState("");
  const handler = async () => {};

  useEffect(() => {
    if (!(typeof org === "string" && typeof uuid === "string")) {
      setMessage("未指定 org 及/或 uuid。");
      return;
    }

    void GetCourse(uuid)
      .then((course) => {
        const cs = CourseResponseSchema.try(course);

        if (cs instanceof ValidationError) {
          console.error(course);
          return Promise.reject(new Error("課程不存在或尚未開放。"));
        }

        setCourseName(cs.name);
        setMessage(null);
        return undefined;
      })
      .catch((error: Error) => setMessage(error.message));
  });

  return (
    <HeaderPageCard
      id="student-checkin-portal"
      title="學生簽到系統"
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
            await router.push("/checkin/success");
          }}
          onFailure={handler}
          loginText={`簽到${courseName}`}
        />
      )}
    </HeaderPageCard>
  );
}

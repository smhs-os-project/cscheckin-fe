import React, { useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";
import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../../utilities/useError";
import ErrorPage from "../../../components/Page/ErrorPage";
import useRedirect from "../../../utilities/useRedirect";

export default function CSCSSOStudentLogin() {
  const [loggedInFlag, setLoggingInFlag] = useState(false);
  const [error, setError] = useError();
  const { redirect } = useRedirect("/");

  if (error) {
    return (
      <ErrorPage
        errorMessage={error.message}
        errorDetails={error.details ?? "學生登入端無法完成登入操作。"}
      />
    );
  }

  return (
    <HeaderPageCard
      id="csc-sso-student-login"
      title="學生登入 CSC 簽到系統"
      desc="登入後即可簽到，以及更新班級資料。"
      icon={faKey}
    >
      {loggedInFlag ? (
        <p>✅ 登入成功！</p>
      ) : (
        <LoginComponent
          scope={Scope.Student}
          onLogin={async () => {
            setLoggingInFlag(true);
            await redirect();
          }}
          onFailure={async (e) => setError(e)}
        />
      )}
    </HeaderPageCard>
  );
}

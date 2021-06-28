import React, { useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import LoginComponent, {
  Scope,
} from "../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../utilities/useError";
import ErrorPage from "../../components/Page/ErrorPage";
import useRedirect from "../../utilities/useRedirect";

export default function CSCSSOTeacherLogin() {
  const [loggedInFlag, setLoggingInFlag] = useState(false);
  const [error, setError] = useError();
  const { redirect } = useRedirect("/");

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <HeaderPageCard
      id="csc-sso-teacher-login"
      title="教師登入 CSC 簽到系統"
      desc="登入後即可管理簽到連結。"
      icon={faKey}
    >
      {loggedInFlag ? (
        <p>✅ 登入成功！</p>
      ) : (
        <LoginComponent
          scope={Scope.Teacher}
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

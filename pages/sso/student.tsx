import React, { useEffect, useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import LoginComponent, {
  Scope,
} from "../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../utilities/useError";
import ErrorPage from "../../components/Page/ErrorPage";
import useRedirect from "../../utilities/useRedirect";
import useUserInfo from "../../utilities/useUserInfo";

export default function CSCSSOStudentLogin() {
  const router = useRouter();
  const [loggedInFlag, setLoggingInFlag] = useState(false);
  const [error, setError] = useError();
  const { redirectTo } = useRedirect("/");
  const { userInfo, ready: userInfoReady } = useUserInfo();

  useEffect(() => {
    if (!userInfoReady || !loggedInFlag) return undefined;

    if (userInfo) {
      if (redirectTo) void router.push(redirectTo);
    } else {
      const redirectParameter = redirectTo
        ? `?redirect=${encodeURIComponent(redirectTo)}`
        : "";
      void router.push(`/config/info${redirectParameter}`);
    }

    return undefined;
  }, [userInfoReady, loggedInFlag, redirectTo, router, userInfo]);

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
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
          }}
          onFailure={async (e) => setError(e)}
        />
      )}
    </HeaderPageCard>
  );
}

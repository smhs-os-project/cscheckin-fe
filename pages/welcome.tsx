import React, { useEffect, useState } from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useAuth from "../components/AuthStore/useAuth";
import { Scope } from "../components/GoogleLoginComponent/LoginComponent";
import Logout from "../components/AuthStore/logout";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";
import ErrorPage from "../components/Page/ErrorPage";
import useError from "../utilities/useError";
import { reportException } from "../utilities/reportExceptionMessage";

export default function CSCAdmin() {
  const router = useRouter();
  const [error, setError] = useError();
  const [userName, setUserName] = useState<string | null>(null);
  const { auth, error: authError } = useAuth(true, Scope.Teacher);

  useEffect(() => {
    auth
      ?.getAccessData()
      .then((accessData) => {
        if (accessData) setUserName(accessData.user.name);
      })
      .catch((e) => reportException(e, "welcome.tsx: 無法取得 access data。"));
  }, [auth]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [setError, authError]);

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <ListChoicePageCard
      id="csc-welcome"
      title={`${userName ? `${userName}，` : ""}歡迎使用本系統！`}
      desc="這個主畫面可以讓你建立及設定簽到連結。"
      icon={faUserAlt}
    >
      {[
        {
          id: "checkin-section",
          name: "建立簽到連結 / 查看過去簽到連結",
          redirect: async () => {
            await router.push("/checkin/manage");
          },
        },
        {
          id: "config-section",
          name: "學生設定班級座號 / 教師設定簽到時限",
          redirect: async () => {
            await router.push("/config");
          },
        },
        {
          id: "logout",
          name: "登出 CSC 系統",
          redirect: Logout,
        },
      ]}
    </ListChoicePageCard>
  );
}

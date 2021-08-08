import React, { useEffect, useState } from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";
import AuthStore from "../components/Database/AuthStore";
import useError from "../utilities/ErrorReporting/useError";
import ErrorPage from "../components/Page/ErrorPage";
import UnexpectedGoogleLoginResponse from "../components/OAuth/Google/exceptions/UnexpectedGoogleLoginResponse";

const authStore = AuthStore.getCommonInstance();

export default function WelcomePage() {
  const router = useRouter();
  const [error, setError] = useError();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (setError)
      void authStore
        .getAuth()
        .then((cscAuth) => cscAuth.userInfo())
        .then((userInfo) => {
          if (userInfo) return setUsername(userInfo.name);
          return Promise.reject(new UnexpectedGoogleLoginResponse());
        })
        .catch(setError);
  }, [setError]);

  if (error)
    return (
      <ErrorPage
        errorMessage="無法載入系統歡迎介面。"
        errorDetails={error.message}
      />
    );

  return (
    <ListChoicePageCard
      title={`${username === "" ? "" : `${username}，`}歡迎使用本系統！`}
      desc="這個主畫面可以讓您管理簽到連結，以及設定相關功能。"
      icon={faUserAlt}
      choice={[
        {
          id: "checkin-section",
          name: "簽到連結管理選單",
          redirect: async () => {
            await router.push("/checkin/manage");
          },
        },
        {
          id: "config-section",
          name: "設定選單",
          redirect: async () => {
            await router.push("/config");
          },
        },
        // {
        //   id: "logout",
        //   name: "登出 CSC 系統",
        //   redirect: Logout,
        // },
      ]}
    />
  );
}

import React from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useUserInfo } from "../components/Http/sdk_auth_methods";
import useAuth from "../components/Database/AuthStore/useAuth";
import type AuthenticatedPageProps from "../components/Database/AuthStore/AuthenticatedPageProps";
import { Scope } from "../components/OAuth/Google/scope";
import AuthStore from "../components/Database/AuthStore";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";
import ErrorPage from "../components/Page/ErrorPage";
import AuthErrorPage from "../components/Database/AuthStore/AuthErrorPage";

function AuthenticatedWelcomePage({ auth }: AuthenticatedPageProps) {
  const router = useRouter();
  const { data: userInfo, error: useUserInfoError } = useUserInfo(auth);

  if (useUserInfoError)
    return (
      <ErrorPage
        errorMessage="無法取得使用者資訊。"
        errorDetails={useUserInfoError?.message}
      />
    );

  return (
    <ListChoicePageCard
      title={`${userInfo ? `${userInfo.name}，` : ""}歡迎使用本系統！`}
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
        {
          id: "logout",
          name: "登出 CSC 系統",
          redirect: async () => {
            await AuthStore.getCommonInstance().logout();
            await router.push("/");
          },
        },
      ]}
    />
  );
}

export default function WelcomePage() {
  const { auth, error: useAuthError } = useAuth(Scope.Teacher);

  if (useAuthError) return <AuthErrorPage authError={useAuthError} />;
  if (auth) return <AuthenticatedWelcomePage auth={auth} />;
  return null;
}

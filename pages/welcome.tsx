import React from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <ListChoicePageCard
      title="{{ user }}，歡迎使用本系統！"
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

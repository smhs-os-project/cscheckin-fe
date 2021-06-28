import { useRouter } from "next/router";
import React from "react";

import { useAuth } from "../../components/AuthStore/useAuth";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function AdminMenu() {
  // TODO: more human-readable index
  // FOR DEVS:
  //   as useAuth() returns
  //   [Authentication Object, Loading?, Logout Method]
  //   we extract the third part, "Logout Method".
  const logout = useAuth()[2];
  const router = useRouter();

  return (
    <ListChoicePageCard
      id="admin-menu"
      title="功能選單"
      desc="選擇要執行的功能。"
    >
      {[
        {
          id: "create",
          name: "建立新的簽到連結",
          redirect: async () => router.push("/checkin/create"),
        },
        {
          id: "previous",
          name: "查看以往的簽到紀錄",
          redirect: async () => router.push("/checkin/previous"),
        },
        {
          id: "configure",
          name: "設定與修改簽到系統",
          redirect: async () => router.push("/config"),
        },
        {
          id: "logout",
          name: "登出",
          redirect: logout,
        },
      ]}
    </ListChoicePageCard>
  );
}

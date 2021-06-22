import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useAuth } from "../components/AuthStore/utilities";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function AdminMenu() {
  const [auth, loading, logout] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !loading) void router.push("/");
  });

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

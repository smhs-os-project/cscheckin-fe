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
          name: "建立簽到連結",
          redirect: async () => router.push("/checkin/create"),
        },
        {
          id: "previous",
          name: "查看簽到紀錄",
          redirect: async () => router.push("/checkin/previous"),
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

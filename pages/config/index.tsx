import React from "react";
import router from "next/router";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function ConfigList() {
  return (
    <ListChoicePageCard
      id="configure"
      title="設定 CSC 簽到系統"
      desc="比如重設班級座號、設定遲到與結束時間等。"
    >
      {[
        {
          id: "configure-class-and-number",
          name: "設定班級座號",
          redirect: async () => router.push("/register?redirect=/config"),
        },
        {
          id: "back",
          name: "返回首頁",
          redirect: async () => router.push("/admin"),
        },
      ]}
    </ListChoicePageCard>
  );
}

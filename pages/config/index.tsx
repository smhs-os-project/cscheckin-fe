import React from "react";
import { useRouter } from "next/router";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function ConfigMenuPage() {
  const router = useRouter();

  return (
    <ListChoicePageCard
      title="設定系統"
      desc="設定您的班級、座號，或者簽到連結的遲到時間。"
      icon={faUserAlt}
      choice={[
        {
          id: "info-setup",
          name: "設定班級座號",
          redirect: async () => {
            await router.push("/config/info");
          },
        },
        {
          id: "duration-setup",
          name: "設定遲到與結束簽到時間",
          redirect: async () => {
            await router.push("/config/checkin-duration");
          },
        },
      ]}
    />
  );
}

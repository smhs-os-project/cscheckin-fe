import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function CSCConfiguration() {
  const router = useRouter();

  return (
    <ListChoicePageCard
      id="csc-configuration"
      title="設定"
      desc="設定您的班級、座號，以及簽到連結的遲到時間。"
      icon={faCog}
    >
      {[
        {
          id: "info-setup",
          name: "設定班級座號",
          redirect: async () => {
            await router.push("/config/info");
          },
        },
        // {
        //   id: "duration-setup",
        //   name: "設定遲到與結束簽到時間",
        //   redirect: async () => {
        //     await router.push("/config/checkin-duration");
        //   },
        // },
      ]}
    </ListChoicePageCard>
  );
}

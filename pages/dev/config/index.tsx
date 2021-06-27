import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ListChoicePageCard from "../../../components/Page/ListChoicePageCard";

export default function CSCConfiguration() {
  return (
    <ListChoicePageCard
      id="csc-configuration"
      title="設定"
      desc="設定您的班級、座號，以及簽到連結。"
      icon={faCog}
    >
      {[
        {
          id: "info-setup",
          name: "設定班級座號",
          redirect: () => {},
        },
        {
          id: "duration-setup",
          name: "設定遲到與結束簽到時間",
          redirect: () => {},
        },
      ]}
    </ListChoicePageCard>
  );
}

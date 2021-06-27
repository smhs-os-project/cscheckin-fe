import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ListChoicePageCard from "../../../../components/Page/ListChoicePageCard";

export default function CSCManageIndex() {
  return (
    <ListChoicePageCard
      id="csc-manage-home"
      title="簽到連結管理選單"
      desc="建立簽到連結，還是查看以往的簽到連結呢？"
      icon={faCog}
    >
      {[
        {
          id: "create-new",
          name: "建立新的簽到連結",
          redirect: () => {},
        },
        {
          id: "see-previous",
          name: "查看以往簽到連結",
          redirect: () => {},
        },
      ]}
    </ListChoicePageCard>
  );
}

import React from "react";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function CheckinPrevious() {
  return (
    <ListChoicePageCard
      id="checkin-choose-previous"
      title="選擇過去紀錄"
      desc="選擇要查看的過去記錄。"
    >
      {[
        {
          id: "10345",
          name: "Hi~",
          redirect: () => undefined,
        },
      ]}
    </ListChoicePageCard>
  );
}

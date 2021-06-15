import React from "react";
import ListChoicePageCard from "../../../components/Page/ListChoicePageCard";

export default function CheckinCreate() {
  return (
    <ListChoicePageCard
      id="checkin-choose-classroom"
      title="選擇 Classroom 教室"
      desc="選擇要設定簽到的 classroom。"
    >
      {[
        {
          id: "203-english",
          name: "203 英文",
          redirect: () => {},
        },
      ]}
    </ListChoicePageCard>
  );
}

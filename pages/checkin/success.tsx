import React from "react";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

export default function CheckinDone() {
  return (
    <HeaderPageCard
      id="student-checkin-done"
      title="完成簽到"
      desc="已經簽到。您可留下本憑證以示證明。"
    >
      <p>時間：{new Date().toString()}</p>
      <p>識別 ID：{Math.round(Math.random() * 300000)}</p>
    </HeaderPageCard>
  );
}

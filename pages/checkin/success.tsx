import React from "react";
import BasePage from "../../components/Page/BasePage";

export default function CheckinDone() {
  return (
    <BasePage id="checkin-done" title="完成簽到" full>
      <h1 className="text-3xl font-bold pb-1">完成簽到</h1>
      <h2 className="text-xl pb-4">已經簽到。您可留下本憑證以示證明。</h2>
      <p>時間：{new Date().toString()}</p>
      <p>識別 ID：{Math.round(Math.random() * 300000)}</p>
    </BasePage>
  );
}

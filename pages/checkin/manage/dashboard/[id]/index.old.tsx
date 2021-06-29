import React, { useState } from "react";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import HeaderCard from "../../../../../components/Card/HeaderCard";
import BasePage from "../../../../../components/Page/BasePage";
import FullWidthColoredButton from "../../../../../components/BaseElements/FullWidthColoredButton";

export default function CSCCheckinDashboard() {
  const [shareLink] = useState("");

  return (
    <BasePage id="csc-checkin-dashboard" title="簽到連結主控台">
      <div className="flex justify-around items-start content-start">
        <section className="flex-1 w-full">
          <HeaderCard
            title="簽到連結管理區"
            desc="分享到 Classroom、複製連結及結束簽到"
            icon={faCog}
          >
            <div className="flex justify-center items-center">
              <input
                type="input"
                className="p-4 m-4 text-lg border-b-2 border-black outline-none bg-transparent text-center w-3/5"
                placeholder="正在載入⋯⋯"
                value={shareLink}
                id="checkin-link"
                readOnly
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </div>
            <FullWidthColoredButton onClick={() => {}}>
              分享到 Classroom
            </FullWidthColoredButton>
            <FullWidthColoredButton onClick={() => {}}>
              複製連結
            </FullWidthColoredButton>
            <FullWidthColoredButton onClick={() => {}}>
              結束簽到
            </FullWidthColoredButton>
          </HeaderCard>
        </section>
        <section className="hidden xl:block flex-1 w-full max-h-96 overflow-y-scroll">
          <HeaderCard
            title="學生名單"
            desc="查看已簽到、遲到以及未簽到的學生名單。"
            icon={faUser}
          >
            {[
              "203-01",
              "203-02",
              "203-03",
              "203-04",
              "203-05",
              "203-06",
              "203-07",
              "203-08",
              "203-09",
            ].map((k) => (
              <FullWidthColoredButton key={k} onClick={() => {}}>
                {k}
              </FullWidthColoredButton>
            ))}
          </HeaderCard>
        </section>
      </div>
    </BasePage>
  );
}

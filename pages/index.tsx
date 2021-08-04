import React from "react";
import Image from "next/image";
import BasePage from "../components/Page/BasePage";
import BaseButtonGroup from "../components/Elements/Button/Group/BaseButtonGroup";
import BaseButton from "../components/Elements/Button/BaseButton";
import CheckinMonitorImg from "../public/home/checkin-monitor.svg";

export default function Home() {
  return (
    <BasePage title="首頁">
      <section className="flex h-full w-full justify-between items-center lg:max-w-5xl mx-auto leading-relaxed">
        <div>
          <h1 className="text-h1 font-header">線上點名，其實不難。</h1>
          <p className="mb-4">
            一鍵簽到、手機端優化——
            <br />
            線上點名不會再是老師的夢魘。
          </p>
          <BaseButtonGroup>
            <BaseButton solid>教師端登入</BaseButton>
            <BaseButton>使用教學</BaseButton>
          </BaseButtonGroup>
        </div>
        <div className="justify-self-end">
          <Image
            src={CheckinMonitorImg as StaticImageData}
            alt="簽到監控畫面"
          />
        </div>
      </section>
    </BasePage>
  );
}

import type { ReactNode } from "react";
import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import DurationInput from "../../components/Elements/Input/DurationInput";
import LargeButtonGroup from "../../components/Elements/Button/Group/LargeButtonGroup";
import LargeButton from "../../components/Elements/Button/LargeButton";

interface InputBoxProps {
  children: ReactNode;
}

function InputBox({ children }: InputBoxProps) {
  return (
    <div className="flex flex-col space-y-2 md:mx-0 md:space-y-0 md:flex-row md:items-center md:justify-between">
      {children}
    </div>
  );
}

function LateInputBox() {
  return (
    <InputBox>
      <div>開課後多久自動劃記遲到</div>
      <DurationInput />
    </InputBox>
  );
}

function EndInputBox() {
  return (
    <InputBox>
      <div>開課後多久自動關閉簽到</div>
      <DurationInput />
    </InputBox>
  );
}

// WIP: RWD & UI optimize
export default function CheckinDurationConfig() {
  return (
    <HeaderPageCard
      title="設定遲到與結束簽到時間"
      desc="設定開課後多久屬於遲到，多久結束簽到。您仍然可以手動結束簽到。"
      icon={faCog}
    >
      <div className="flex flex-col space-y-10 mb-8 mx-2 md:mx-0">
        <LateInputBox />
        <EndInputBox />
      </div>
      <LargeButtonGroup>
        <LargeButton solid full>
          儲存
        </LargeButton>
      </LargeButtonGroup>
    </HeaderPageCard>
  );
}

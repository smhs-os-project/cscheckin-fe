import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import BaseInput from "../../components/Elements/Input/BaseInput";
import LargeButton from "../../components/Elements/Button/LargeButton";
import LargeButtonGroup from "../../components/Elements/Button/Group/LargeButtonGroup";

export default function ConfigInfo() {
  return (
    <HeaderPageCard
      title="設定班級座號"
      desc="重新設定您的班級座號"
      icon={faCog}
    >
      <section className="grid grid-cols-2 gap-4 mb-4 w-full">
        <BaseInput label="班級" />
        <BaseInput label="座號" />
      </section>
      <LargeButtonGroup>
        <LargeButton solid full>
          儲存
        </LargeButton>
      </LargeButtonGroup>
    </HeaderPageCard>
  );
}

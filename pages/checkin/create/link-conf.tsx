import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import React, { useState } from "react";
import BaseButton from "../../../components/BaseElements/BaseButton";
import BaseInput from "../../../components/BaseElements/BaseInput";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

interface CheckinComponentProps {
  id: string;
  children: ReactNode;
  help?: () => void;
  suffix?: ReactNode;
}

function CheckinComponent({
  id,
  children,
  help,
  suffix,
}: CheckinComponentProps) {
  return (
    <section
      className={`flex mb-2 items-center content-center justify-around ${id}`}
    >
      <div>{children}</div>
      {suffix}
      {help && (
        <button type="button">
          <FontAwesomeIcon icon={faQuestion} onClick={help} />
        </button>
      )}
    </section>
  );
}

CheckinComponent.defaultProps = {
  help: null,
  suffix: null,
};

function useWarn(): [string, (message: string) => void] {
  const warnShowDuration = 3000; // ms
  const [warnMessage, setWarnMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState<unknown>(undefined);

  const warn = (message: string) => {
    setWarnMessage(message);
    // FIXME: "any"
    clearTimeout(timeoutId as any);
    setTimeoutId(setTimeout(() => setWarnMessage(""), warnShowDuration));
  };

  return [warnMessage, warn];
}

export default function CheckinCreate() {
  const checkinOntimeDurationId = "checkin-ontime-duration";
  const checkinEndDurationId = "checkin-end-duration";

  const [warnMessage, warn] = useWarn();
  const [ontimeDuration, setOntimeDuration] = useState("10");
  const [endDuration, setEndDuration] = useState("55");

  return (
    <HeaderPageCard
      id="checkin-choose-classroom"
      title="設定簽到連結"
      desc="選擇遲到與結束時間。設定後不能修改。"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <CheckinComponent
          id={checkinOntimeDurationId}
          help={() => {
            warn("在「簽到準時時間」之後進來的學生都會標記為「遲到」。");
          }}
          suffix={<span className="mr-1">分鐘內</span>}
        >
          <BaseInput
            id={`${checkinEndDurationId}-input`}
            label="簽到準時時間"
            type="number"
            value={ontimeDuration}
            onChange={setOntimeDuration}
          />
        </CheckinComponent>
        <CheckinComponent
          id={checkinEndDurationId}
          help={() => {
            warn(
              "在「簽到結束時間」之後，學生就不能補簽。系統會將未簽到學生標記成「未簽到」。"
            );
          }}
          suffix={<span className="mr-1">分鐘後</span>}
        >
          <BaseInput
            id={`${checkinEndDurationId}-input`}
            label="簽到結束時間"
            type="number"
            value={endDuration}
            onChange={setEndDuration}
          />
        </CheckinComponent>
        <div className="my-3 text-red-600 warning-message">{warnMessage}</div>
        <div className="flex justify-between">
          <BaseButton solid submit>
            儲存
          </BaseButton>
        </div>
      </form>
    </HeaderPageCard>
  );
}

/* DEPRECATED CODE */

// const [startTime, setStartTime] = useState<Date | null>(new Date());
// const [endTime, setEndTime] = useState<Date | null>(
//   new Date(Date.now() + 60 * 60 * 1000 /* 60 分鐘 */)
// );

// const isoTimeFormatHelp = `
// 格式是「年年年年-月月-日日T時時-分分-秒秒」。

// 範例：
//   2021-06-14T20:00:00
//     2021 年 6 月 14 日的晚上 8 點整

//   2021-06-15T07:15:00
//     2021 年 6 月 15 日的早上 7 點 15 分整
// `;

// const showHelp = (help: string) => alert(help.trim());

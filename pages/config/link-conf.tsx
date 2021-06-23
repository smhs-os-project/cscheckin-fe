import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import React, { useState } from "react";
import BaseButton from "../../components/BaseElements/BaseButton";
import BaseInput from "../../components/BaseElements/BaseInput";
import { END_DURATION, LATE_DURATION } from "../../components/LocalDB/consts";
import { useConfig } from "../../components/LocalDB/utilities";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import Sentry from "../../utilities/sentry";

const DEFAULT_LATE_DURATION = "10:00";
const DEFAULT_END_DURATION = "60:00";

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

  if (warnMessage !== "") {
    // Sentry.captureMessage(
    //   `link-conf: 警告訊息 (${warnMessage})`,
    //   Sentry.Severity.Debug
    // );
  }

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
  // const [iLateDuration, setILateDuration] = useState(DEFAULT_LATE_DURATION);
  // const [iEndDuration, setIEndDuration] = useState(DEFAULT_END_DURATION);
  const [lateDuration, setLateDuration] = useConfig(LATE_DURATION);
  const [endDuration, setEndDuration] = useConfig(END_DURATION);

  return (
    <HeaderPageCard
      id="checkin-duration-configure"
      title="設定簽到連結"
      desc="選擇未來簽到連結使用的遲到與結束時間。可隨時修改。"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <CheckinComponent
          id={checkinOntimeDurationId}
          help={() => {
            warn("超過「準時簽到時限」後簽到的學生都會被標記為「⚠️ 遲到」。");
          }}
          suffix={<span className="mr-1">分分：秒秒</span>}
        >
          <BaseInput
            id={`${checkinEndDurationId}-input`}
            label="準時簽到時限"
            value={lateDuration ?? DEFAULT_LATE_DURATION}
            onChange={setLateDuration}
          />
        </CheckinComponent>
        <CheckinComponent
          id={checkinEndDurationId}
          help={() => {
            warn(
              "超過「課程簽到時限」後，學生就不能補簽。系統會將未簽到學生標記成「❌ 未到」。"
            );
          }}
          suffix={<span className="mr-1">分分：秒秒</span>}
        >
          <BaseInput
            id={`${checkinEndDurationId}-input`}
            label="課程簽到時限"
            value={endDuration ?? DEFAULT_END_DURATION}
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

import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
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

  const router = useRouter();
  const { cid } = router.query;

  const [warnMessage, warn] = useWarn();
  const [ontimeDuration, setOntimeDuration] = useState("10");
  const [endDuration, setEndDuration] = useState("55");

  return (
    <HeaderPageCard
      id="checkin-choose-classroom"
      title="設定簽到連結"
      desc="選擇遲到與結束時間。設定後不能修改。"
    >
      {typeof cid === "string" ? (
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
            suffix={<span className="mr-1">分鐘內</span>}
          >
            <BaseInput
              id={`${checkinEndDurationId}-input`}
              label="準時簽到時限"
              type="number"
              value={ontimeDuration}
              onChange={setOntimeDuration}
            />
          </CheckinComponent>
          <CheckinComponent
            id={checkinEndDurationId}
            help={() => {
              warn(
                "超過「課程簽到時限」後，學生就不能補簽。系統會將未簽到學生標記成「❌ 未到」。"
              );
            }}
            suffix={<span className="mr-1">分鐘後</span>}
          >
            <BaseInput
              id={`${checkinEndDurationId}-input`}
              label="課程簽到時限"
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
      ) : (
        <p>未指定 Classroom ID。請回到管理選單重新設定。</p>
      )}
    </HeaderPageCard>
  );
}

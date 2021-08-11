import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import type {
  Duration,
  DurationInputProps,
} from "../../components/Elements/Input/DurationInput";
import LocalDB from "../../components/Database/LocalDB";
import {
  END_DURATION,
  END_DURATION_DEFAULT,
  LATE_DURATION,
  LATE_DURATION_DEFAULT,
} from "../../components/Database/LocalDB/consts";
import useRedirect from "../../components/Hooks/useRedirect";

const DurationInput = dynamic(
  () => import("../../components/Elements/Input/DurationInput")
);
const LargeButtonGroup = dynamic(
  () => import("../../components/Elements/Button/Group/LargeButtonGroup")
);
const LargeButton = dynamic(
  () => import("../../components/Elements/Button/LargeButton")
);

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

type DurationInputBoxProps = Pick<DurationInputProps, "value"> &
  Pick<DurationInputProps, "onChange">;

function LateInputBox({ value, onChange }: DurationInputBoxProps) {
  return (
    <InputBox>
      <div>開課後多久自動劃記遲到</div>
      <DurationInput value={value} onChange={onChange} />
    </InputBox>
  );
}

function EndInputBox({ value, onChange }: DurationInputBoxProps) {
  return (
    <InputBox>
      <div>開課後多久自動關閉簽到</div>
      <DurationInput value={value} onChange={onChange} />
    </InputBox>
  );
}

const numberPaddingZero = (num: number) => num.toString().padStart(2, "0");
const getDurationString = (hour = 1, min = 1, sec = 0) =>
  `${numberPaddingZero(hour)}:${numberPaddingZero(min)}:${numberPaddingZero(
    sec
  )}`;

export default function CheckinDurationConfig() {
  const { redirect } = useRedirect("/config");
  const [lateAt, setLateAt] = useState<Duration>({ h: 0, m: 0 });
  const [endAt, setEndAt] = useState<Duration>({ h: 0, m: 0 });

  useEffect(() => {
    const localDB = LocalDB.getInstance();
    const lateDuration = (
      localDB.get(LATE_DURATION) ?? LATE_DURATION_DEFAULT
    ).split(":");
    const endDuration = (
      localDB.get(END_DURATION) ?? END_DURATION_DEFAULT
    ).split(":");

    if (lateDuration.length >= 2) {
      const h = Number(lateDuration[0]);
      const m = Number(lateDuration[1]);
      setLateAt((ps) => ({
        h: Number.isNaN(h) ? ps.h : h,
        m: Number.isNaN(m) ? ps.m : m,
      }));
    }

    if (endDuration.length >= 2) {
      const h = Number(endDuration[0]);
      const m = Number(endDuration[1]);
      setEndAt((ps) => ({
        h: Number.isNaN(h) ? ps.h : h,
        m: Number.isNaN(m) ? ps.m : m,
      }));
    }
  }, []);

  return (
    <HeaderPageCard
      title="設定遲到與結束簽到時間"
      desc="設定開課後多久屬於遲到，多久結束簽到。您仍然可以手動結束簽到。"
      icon={faCog}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const localDB = LocalDB.getInstance();

          if (!lateAt.h && !lateAt.m) {
            return Swal.fire(
              "未指定劃記遲到時間。",
              "或者是時間小於 1 分鐘。",
              "error"
            );
          }

          if (!endAt.h && !endAt.m) {
            return Swal.fire(
              "未指定關閉簽到時間。",
              "或者是時間小於 1 分鐘。",
              "error"
            );
          }

          localDB.set(
            LATE_DURATION,
            getDurationString(lateAt.h ?? 0, lateAt.m ?? 10)
          );
          localDB.set(
            END_DURATION,
            getDurationString(endAt.h ?? 1, endAt.m ?? 0)
          );

          await Swal.fire(
            "設定完成！",
            "下次建立課程時就會套用這裡的設定。",
            "success"
          );
          return redirect();
        }}
      >
        <div className="flex flex-col space-y-10 mb-8 md:mx-0">
          <LateInputBox value={lateAt} onChange={setLateAt} />
          <EndInputBox value={endAt} onChange={setEndAt} />
        </div>
        <LargeButtonGroup>
          <LargeButton submit solid full>
            儲存
          </LargeButton>
        </LargeButtonGroup>
      </form>
    </HeaderPageCard>
  );
}

import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import useRedirect from "../../utilities/useRedirect";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import BaseInput from "../../components/BaseElements/BaseInput";
import BaseButton from "../../components/BaseElements/BaseButton";
import { useConfig } from "../../components/LocalDB/utilities";
import {
  END_DURATION,
  END_DURATION_DEFAULT,
  LATE_DURATION,
  LATE_DURATION_DEFAULT,
} from "../../components/LocalDB/consts";

interface TimeStructure {
  late?: string | null;
  end?: string | null;
}

function timeStructureReducer(
  prevState: TimeStructure,
  action: TimeStructure
): TimeStructure {
  return {
    late: action.late ?? prevState.late,
    end: action.end ?? prevState.end,
  };
}

const timeDiffFmt = /^\d{2}:\d{2}:\d{2}$/;
const timeDiffHint =
  "(1) 冒號必須半形 (:) <br /> (2) 格式是「小時:分鐘:秒鐘」，各「兩位」數字！";

export default function CSCConfigCheckinDuration() {
  const router = useRouter();
  const { redirect } = useRedirect("/config");
  const [lateTimeConfig, setLateTimeConfig] = useConfig(LATE_DURATION);
  const [endTimeConfig, setEndTimeConfig] = useConfig(END_DURATION);

  const [time, setTime] = useReducer(timeStructureReducer, {
    late: null,
    end: null,
  });

  useEffect(() => {
    if (!time.late) {
      setTime({ late: lateTimeConfig });
    }

    if (!time.end) {
      setTime({ end: endTimeConfig });
    }
  }, [lateTimeConfig, endTimeConfig, time.end, time.late]);

  return (
    <HeaderPageCard
      id="config-checkin-duration"
      title="設定遲到與結束簽到時間"
      desc="設定一個簽到連結的遲到與結束簽到時間。"
      icon={faCog}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (time.late && timeDiffFmt.exec(time.late)) {
            setLateTimeConfig(time.late);
          } else {
            await Swal.fire(
              "「學生準時時限」格式錯誤！",
              timeDiffHint,
              "error"
            );
            return;
          }

          if (time.end && timeDiffFmt.exec(time.end)) {
            setEndTimeConfig(time.end);
          } else {
            await Swal.fire(
              "「結束簽到時間」格式錯誤！",
              timeDiffHint,
              "error"
            );
            return;
          }

          await redirect();
        }}
      >
        <p className="mb-2">
          時間格式是「小時:分鐘:秒鐘」。數字各兩位。請使用「半形」冒號。
        </p>
        <BaseInput
          id="late-time"
          label="學生準時時限"
          placeholder={`預設值：${LATE_DURATION_DEFAULT}`}
          value={time.late ?? ""}
          onChange={(value) => {
            setTime({
              late: value,
            });
          }}
          required
        />
        <BaseInput
          id="end-time"
          label="結束簽到時間"
          placeholder={`預設值：${END_DURATION_DEFAULT}`}
          value={time.end ?? ""}
          onChange={(value) => {
            setTime({
              end: value,
            });
          }}
          required
        />
        <BaseButton solid submit className="mt-4">
          儲存
        </BaseButton>
        <BaseButton className="mt-4 ml-2" onClick={() => router.back()}>
          取消
        </BaseButton>
      </form>
    </HeaderPageCard>
  );
}

import { CheckinState } from "cscheckin-js-sdk/dist/types";

export default function getStateBrief(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅ 準時";
    case CheckinState.LATE:
      return "⚠️ 遲到";
    case CheckinState.NOT_CHECKED_IN:
      return "❌ 未簽到";
    default:
      return "未知狀態";
  }
}

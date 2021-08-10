import { CheckinState } from "cscheckin-js-sdk/dist/types";

export default function GetCheckinStatusBrief(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅ 準時";
    case CheckinState.LATE:
      return "⚠️ 遲到";
    default:
      return "❌ 未到";
  }
}

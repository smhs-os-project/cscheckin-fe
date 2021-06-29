import { CheckinState } from "cscheckin-js-sdk/dist/types";

export function getCourseStatus(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "目前簽到的學生均標記為「✅ 準時」。";
    case CheckinState.LATE:
      return "目前已超過「準時簽到時限」， 後續簽到的學生將標記為「⚠️ 遲到」。";
    default:
      return "目前簽到已結束， 未到的學生將標記為「❌ 未到」，且不能再補簽。";
  }
}

export function getCheckinStatusIcon(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅";
    case CheckinState.LATE:
      return "⚠️";
    default:
      return "❌";
  }
}

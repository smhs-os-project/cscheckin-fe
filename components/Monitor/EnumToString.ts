import { CheckinState } from "cscheckin-js-sdk/dist/types";

export function getCourseStatus(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅ 新進學生皆為準時。";
    case CheckinState.LATE:
      return "⚠️ 後進學生記為遲到。";
    default:
      return "❌ 學生不能繼續簽到。";
  }
}

export function getCheckinStatusIcon(state: CheckinState) {
  switch (state) {
    case CheckinState.ON_TIME:
      return "✅";
    case CheckinState.LATE:
      return "⚠";
    default:
      return "❌";
  }
}

import { Checkin, CheckinList } from "cscheckin-js-sdk";
import AuthStore from "../Database/Auth";
import useHttpBuilder from "./useHttpBuilder";

const auth = AuthStore.getCommonInstance();

export const useCheckin = (courseUUID: string) =>
  useHttpBuilder(
    "student/checkin",
    async (_, inAuth, inCourseUUID) => Checkin(inCourseUUID, inAuth),
    auth.Auth,
    courseUUID
  );

export const useCheckinList = (courseId: number) =>
  useHttpBuilder(
    "teacher/checkin_list",
    async (_, inAuth, inCourseId) => CheckinList(inCourseId, inAuth),
    auth.Auth,
    courseId
  );

export default {
  useCheckin,
  useCheckinList,
};

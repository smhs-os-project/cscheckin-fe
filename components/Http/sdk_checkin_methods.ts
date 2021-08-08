import { Checkin, CheckinList } from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useHttpBuilder from "./useHttpBuilder";

export const useCheckin = (courseUUID: string, auth: CSCAuth) =>
  useHttpBuilder(
    "student/checkin",
    async (_, inAuth, inCourseUUID) => Checkin(inCourseUUID, inAuth),
    auth,
    courseUUID
  );

export const useCheckinList = (courseId: number, auth: CSCAuth) =>
  useHttpBuilder(
    "teacher/checkin_list",
    async (_, inAuth, inCourseId) => CheckinList(inCourseId, inAuth),
    auth,
    courseId
  );

export default {
  useCheckin,
  useCheckinList,
};

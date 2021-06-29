import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useSWR, { mutate } from "swr";
import type {
  ShareResponse,
  TeacherCheckinListResponse,
  CourseResponse,
} from "cscheckin-js-sdk/dist/types";
import {
  CheckinList,
  CloseCourse,
  GetCourseByID,
  GetShareLink,
  ShareToClassroom,
  SyncCourseMembers,
} from "cscheckin-js-sdk";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { ErrorData } from "../../utilities/useError";

export interface DashboardDeps {
  id?: string | null;
  auth?: CSCAuth | null;
  authRecheck?: () => void;
  courseInfo?: CourseResponse | null;
  courseStatus?: CheckinState | null;
  lockFlag?: boolean;
  setLockFlag?: (val: boolean) => void;
  setMessage?: (val: string) => void;
  setError?: (val: ErrorData) => void;
  setCourseStatus?: (val: CheckinState) => void;
}

export async function refreshData(id: string, auth: CSCAuth | null) {
  await Promise.all(
    [
      ["teacher.checkin_list", id, auth],
      ["course.get_course.get_course_by_id", id, auth],
    ].map((key) => mutate(key))
  );
}

export function useCheckinList(id: string, auth: CSCAuth | null) {
  return useSWR<TeacherCheckinListResponse | null, unknown>(
    ["teacher.checkin_list", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return CheckinList(Number(inId), inAuth);
      return null;
    },
    { refreshInterval: 30000 }
  );
}

export function useCheckinLink(id: string, auth: CSCAuth | null) {
  return useSWR<ShareResponse | null, unknown>(
    ["course.get_share_link", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return GetShareLink(Number(inId), inAuth);
      return null;
    }
  );
}

export function useCourseInfo(id: string, auth: CSCAuth | null) {
  return useSWR<CourseResponse | null, unknown>(
    ["course.get_course.get_course_by_id", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return GetCourseByID(Number(inId), inAuth);
      return null;
    },
    { refreshInterval: 30000 }
  );
}

export function shareLinkActionWrapper({
  id,
  auth,
  setLockFlag,
  setMessage,
  setError,
}: DashboardDeps) {
  if (!setLockFlag || !setMessage || !setError)
    throw new Error("lack some deps: setLockFlag, setMessage, setError");

  return async () => {
    setLockFlag(true);
    if (auth) {
      try {
        const ok = await ShareToClassroom(Number(id), auth);

        if (ok) {
          setMessage("✅ 分享成功！");
          setLockFlag(false);
        } else {
          setError({
            message: "無法分享連結到 Classroom : (",
            details: "伺服器返回「不成功」",
          });
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError({
            message: "無法分享連結到 Classroom : (",
            details: e.message,
          });
        } else {
          setError({
            message: "無法分享連結到 Classroom : (",
            details: `${e}`,
          });
        }
      }
    }
  };
}

export function closeCourseActionWrapper({
  id,
  auth,
  courseStatus,
  setLockFlag,
  setMessage,
  setError,
}: DashboardDeps) {
  if (!setLockFlag || !setMessage || !setError)
    throw new Error("lack some deps: setLockFlag, setMessage, setError");

  return async () => {
    setLockFlag(true);
    if (
      auth &&
      (courseStatus === CheckinState.ON_TIME ||
        courseStatus === CheckinState.LATE) &&
      id
    ) {
      try {
        const ok = await CloseCourse(Number(id), auth);

        if (ok) {
          await refreshData(id, auth);
          setMessage("❌ 已經關閉課程。");
          setLockFlag(false);
        } else {
          setError({
            message: "無法關閉課程 : (",
            details: "API 返回「不成功」。",
          });
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError({
            message: "無法關閉課程 : (",
            details: e.message,
          });
        } else {
          setError({
            message: "無法關閉課程 : (",
            details: `${e}`,
          });
        }
      }
    } else {
      setMessage("😅 課程已經停止簽到，不用再按了！");
      setLockFlag(false);
    }
  };
}

export function syncListActionWrapper({
  id,
  auth,
  setLockFlag,
  setMessage,
  setError,
}: DashboardDeps) {
  if (!setLockFlag || !setMessage || !setError)
    throw new Error("lack some deps: setLockFlag, setMessage, setError");

  return async () => {
    setLockFlag(true);
    if (auth) {
      try {
        const ok = await SyncCourseMembers(Number(id), auth);

        if (ok) {
          setMessage("✅ 已經同步學生名單！");
          setLockFlag(false);
        } else {
          setError({
            message: "無法同步課程 : (",
            details: "API 返回「不成功」。",
          });
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError({
            message: "無法同步學生名單 : (",
            details: e.message,
          });
        } else {
          setError({
            message: "無法同步學生名單 : (",
            details: `${e}`,
          });
        }
      }
    }
  };
}

import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useSWR from "swr";
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
  isBefore,
  ShareToClassroom,
  SyncCourseMembers,
} from "cscheckin-js-sdk";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import NProgress from "nprogress";
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

export function useCheckinList(id: string, auth: CSCAuth | null) {
  return useSWR<TeacherCheckinListResponse | null, unknown>(
    ["", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return CheckinList(Number(inId), inAuth);
      return null;
    }
  );
}

export function useCheckinLink(id: string, auth: CSCAuth | null) {
  return useSWR<ShareResponse | null, unknown>(
    ["", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return GetShareLink(Number(inId), inAuth);
      return null;
    }
  );
}

export function useCourseInfo(id: string, auth: CSCAuth | null) {
  return useSWR<CourseResponse | null, unknown>(
    ["", id, auth],
    async (_, inId: string, inAuth: typeof auth) => {
      if (inAuth) return GetCourseByID(Number(inId), inAuth);
      return null;
    }
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
        await ShareToClassroom(Number(id), auth);
        setMessage("✅ 分享成功！");
        setLockFlag(false);
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
        courseStatus === CheckinState.LATE)
    ) {
      try {
        await CloseCourse(Number(id), auth);
        setMessage("❌ 已經關閉課程。");
        setLockFlag(false);
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
        await SyncCourseMembers(Number(id), auth);
        setMessage("✅ 已經同步學生名單！");
        setLockFlag(false);
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

export function lockFlagEffectWrapper({ lockFlag }: DashboardDeps) {
  return () => {
    if (lockFlag) NProgress.start();
    else NProgress.done();
  };
}

export function courseStatusEffectWrapper({
  courseInfo,
  setCourseStatus,
}: DashboardDeps) {
  if (!setCourseStatus) throw new Error("lack some deps: setCourseStatus");

  return () => {
    if (courseInfo) {
      if (isBefore(courseInfo.start_timestamp, courseInfo.expire_time)) {
        // Date.now() > start time + end duration
        setCourseStatus(CheckinState.NOT_CHECKED_IN);
      } else if (isBefore(courseInfo.start_timestamp, courseInfo.late_time)) {
        // Date.now() > start time + late duration
        setCourseStatus(CheckinState.LATE);
      } else {
        setCourseStatus(CheckinState.ON_TIME);
      }
    }
  };
}

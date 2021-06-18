import {
  CheckinList,
  CloseCourse,
  GetCourseByID,
  GetShareLink,
  isBefore,
  ShareToClassroom,
  SyncCourseMembers,
} from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import {
  CheckinState,
  CourseResponseSchema,
  ShareResponseSchema,
  TeacherCheckinListResponseSchema,
} from "cscheckin-js-sdk/dist/types";
import type { TeacherCheckinListResponse } from "cscheckin-js-sdk/dist/types";
import { ValidationError } from "myzod";

export interface StageDeps {
  id: string | string[] | unknown;
  auth: CSCAuth | null;
  setMessage: (message: string) => void;
}

export type StageAction<T> = (deps: StageDeps) => Promise<T>;

const INVALID_ID_OR_AUTH = () => Promise.reject(new Error("未經身份驗證"));

export const ShareToClassroomAction: StageAction<string> = async ({
  id,
  auth,
  setMessage,
}) => {
  if (typeof id === "string" && auth) {
    return ShareToClassroom(id, auth).then((strRaw) => {
      const str = ShareResponseSchema.try(strRaw);
      if (str instanceof ValidationError)
        return Promise.reject(new Error("連結分享失敗。"));
      setMessage("連結已分享至 Google Classroom。");

      return Promise.resolve(str.link);
    });
  }

  return INVALID_ID_OR_AUTH();
};

export const EndCheckinAction: StageAction<void> = async ({ id, auth }) => {
  if (typeof id === "string" && auth) {
    return CloseCourse(Number(id), auth).then((strRaw) => {
      if (!strRaw) {
        return Promise.reject(new Error("結束簽到失敗。"));
      }
      return Promise.resolve();
    });
  }

  return INVALID_ID_OR_AUTH();
};

export const GetCourseStateAction: StageAction<CheckinState> = async ({
  id,
  auth,
}) => {
  if (typeof id === "string" && auth) {
    return GetCourseByID(Number(id), auth).then((rawCourse) => {
      const course = CourseResponseSchema.try(rawCourse);

      if (course instanceof ValidationError) {
        return Promise.reject(new Error("取得課程失敗。"));
      }

      if (isBefore(course.start_timestamp, course.expire_time)) {
        return Promise.resolve(CheckinState.NOT_CHECKED_IN);
      }
      if (isBefore(course.start_timestamp, course.late_time)) {
        return Promise.resolve(CheckinState.LATE);
      }

      return Promise.resolve(CheckinState.ON_TIME);
    });
  }
  return INVALID_ID_OR_AUTH();
};

export const GetLinkAction: StageAction<string> = async ({ id, auth }) => {
  if (typeof id === "string" && auth) {
    // gsl = Get
    return GetShareLink(id, auth).then((gslRaw) => {
      const gsl = ShareResponseSchema.try(gslRaw);

      if (gsl instanceof ValidationError)
        return Promise.reject(new Error("連結取得失敗。"));

      return Promise.resolve(gsl.link);
    });
  }

  return INVALID_ID_OR_AUTH();
};

export const GetCheckinListAction: StageAction<TeacherCheckinListResponse> =
  async ({ id, auth }) => {
    if (typeof id === "string" && auth) {
      // cl = Check-in List
      return CheckinList(id, auth).then((clRaw) => {
        const cl = TeacherCheckinListResponseSchema.try(clRaw);
        if (cl instanceof ValidationError) {
          return Promise.reject(new Error("無法取得簽到資料。"));
        }
        return Promise.resolve(cl);
      });
    }

    return INVALID_ID_OR_AUTH();
  };

export const SyncListAction: StageAction<void> = async ({ id, auth }) => {
  if (typeof id === "string" && auth) {
    return SyncCourseMembers(Number(id), auth).then((success) => {
      if (!success) return Promise.reject(new Error("無法更新學生名單。"));
      return Promise.resolve();
    });
  }
  return INVALID_ID_OR_AUTH();
};

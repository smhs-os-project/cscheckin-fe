import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import type {
  CourseListResponse,
  CourseResponse,
  GClassroomListResponse,
  ShareResponse,
} from "cscheckin-js-sdk/dist/types";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import { isBefore } from "cscheckin-js-sdk/dist/utilities";
import useError from "../Hooks/useError";
import LocalDB from "../Database/LocalDB";
import {
  END_DURATION,
  END_DURATION_DEFAULT,
  LATE_DURATION,
  LATE_DURATION_DEFAULT,
} from "../Database/LocalDB/consts";
import useHttpBuilder from "./useHttpBuilder";
import type { HttpResponse } from "./HttpResponse";

export const useCreateCourse = (
  classroomId: string,
  auth: CSCAuth
): HttpResponse<CourseResponse> => {
  const [error, setError] = useError();
  const [data, setData] = useState<CourseResponse>();

  useEffect(() => {
    const localDB = LocalDB.getInstance();

    if (!data && !error)
      void import("cscheckin-js-sdk")
        .then((mod) => mod.CreateCourse)
        .then((CreateCourse) =>
          CreateCourse(
            classroomId,
            {
              start_timestamp: new Date(),
              late_time: localDB.get(LATE_DURATION) ?? LATE_DURATION_DEFAULT,
              expire_time: localDB.get(END_DURATION) ?? END_DURATION_DEFAULT,
            },
            auth
          )
        )
        .then((response) => setData(response))
        .catch((recvError: unknown) => setError(recvError));
  }, [auth, classroomId, setError, data, error]);

  return {
    data: data ?? null,
    error,
    pending: !data && !error,
  };
};

export const useClassroomsList = (
  auth: CSCAuth
): HttpResponse<GClassroomListResponse> =>
  useHttpBuilder(
    "course/get_classrooms_list",
    async (_, inAuth) => {
      const GetClassroomsList = await import("cscheckin-js-sdk").then(
        (mod) => mod.GetClassroomsList
      );

      return GetClassroomsList(inAuth);
    },
    auth
  );

export const useCourseInfoById = (
  courseId: number,
  auth: CSCAuth
): HttpResponse<CourseResponse> =>
  useHttpBuilder(
    "course/get_course_by_id",
    async (_, inAuth, inCourseId) => {
      const GetCourseByID = await import("cscheckin-js-sdk").then(
        (mod) => mod.GetCourseByID
      );

      return GetCourseByID(inCourseId, inAuth);
    },
    auth,
    courseId,
    { refreshInterval: 30000 }
  );

export const useCourseStatusById = (
  courseId: number,
  auth: CSCAuth
): HttpResponse<CheckinState> => {
  const {
    data: courseInfo,
    error,
    pending,
  } = useCourseInfoById(courseId, auth);
  const [courseStatus, setCourseStatus] = useState<CheckinState>();

  useEffect(() => {
    if (!pending && courseInfo) {
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
  }, [pending, courseInfo]);

  return {
    data: courseStatus ?? null,
    error,
    pending,
  };
};

export const useCourseInfoByUUID = (
  courseUUID: string
): HttpResponse<CourseResponse> =>
  useHttpBuilder(
    "course/get_course_by_uuid",
    async (_, _auth, inCourseUUID) => {
      const GetCourseByUUID = await import("cscheckin-js-sdk").then(
        (mod) => mod.GetCourseByUUID
      );

      return GetCourseByUUID(inCourseUUID);
    },
    null,
    courseUUID
  );

export const useCoursesList = (
  auth: CSCAuth
): HttpResponse<CourseListResponse> =>
  useHttpBuilder(
    "course/get_courses_list",
    async (_, inAuth) => {
      const GetCoursesList = await import("cscheckin-js-sdk").then(
        (mod) => mod.GetCoursesList
      );

      return GetCoursesList(inAuth);
    },
    auth,
    undefined,
    { refreshInterval: 30000 }
  );

export const useCourseShareLink = (
  courseId: number,
  auth: CSCAuth
): HttpResponse<ShareResponse> =>
  useHttpBuilder(
    "course/get_share_link",
    async (_, inAuth, inCourseId) => {
      const GetShareLink = await import("cscheckin-js-sdk").then(
        (mod) => mod.GetShareLink
      );

      return GetShareLink(inCourseId, inAuth);
    },
    auth,
    courseId
  );

import {
  CreateCourse,
  GetClassroomsList,
  GetCourseByID,
  GetCourseByUUID,
  GetCoursesList,
  GetShareLink,
} from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import type { CourseResponse } from "cscheckin-js-sdk/dist/types";
import useError from "../../utilities/ErrorReporting/useError";
import useHttpBuilder from "./useHttpBuilder";
import type { HttpResponse } from "./HttpResponse";

export const useCreateCourse = (
  classroomId: string,
  auth: CSCAuth
): HttpResponse<CourseResponse> => {
  const [error, setError] = useError();
  const [data, setData] = useState<CourseResponse>();

  useEffect(() => {
    if (!data && !error)
      void CreateCourse(
        classroomId,
        {
          start_timestamp: new Date(),
          late_time: "00:15:00",
          expire_time: "01:00:00",
        },
        auth
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

export const useClassroomsList = (auth: CSCAuth) =>
  useHttpBuilder(
    "course/get_classrooms_list",
    async (_, inAuth) => GetClassroomsList(inAuth),
    auth
  );

export const useCourseInfoById = (courseId: number, auth: CSCAuth) =>
  useHttpBuilder(
    "course/get_course_by_id",
    async (_, inAuth, inCourseId) => GetCourseByID(inCourseId, inAuth),
    auth,
    courseId
  );

export const useCourseInfoByUUID = (courseUUID: string) =>
  useHttpBuilder(
    "course/get_course_by_uuid",
    async (_, _auth, inCourseUUID) => GetCourseByUUID(inCourseUUID),
    null,
    courseUUID
  );

export const useCoursesList = (auth: CSCAuth) =>
  useHttpBuilder(
    "course/get_courses_list",
    async (_, inAuth) => GetCoursesList(inAuth),
    auth
  );

export const useCourseShareLink = (courseId: number, auth: CSCAuth) =>
  useHttpBuilder(
    "course/get_share_link",
    async (_, inAuth, inCourseId) => GetShareLink(inCourseId, inAuth),
    auth,
    courseId
  );

export default {
  useCreateCourse,
  useClassroomsList,
  useCourseInfoById,
  useCourseInfoByUUID,
  useCoursesList,
  useCourseShareLink,
};

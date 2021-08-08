import {
  CreateCourse,
  GetClassroomsList,
  GetCourseByID,
  GetCourseByUUID,
  GetCoursesList,
  GetShareLink,
} from "cscheckin-js-sdk";
import type { CreateCourseRequest } from "cscheckin-js-sdk/dist/types";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import useHttpBuilder from "./useHttpBuilder";

export interface CreateCoursePayload extends CreateCourseRequest {
  classroomId: string;
}

export const useCreateCourse = (payload: CreateCoursePayload, auth: CSCAuth) =>
  useHttpBuilder(
    "course/create_course",
    async (_, inAuth, { classroomId, ...request }) =>
      CreateCourse(classroomId, request, inAuth),
    auth,
    payload
  );

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

import {
  CreateCourse,
  GetClassroomsList,
  GetCourseByID,
  GetCourseByUUID,
  GetCoursesList,
  GetShareLink,
} from "cscheckin-js-sdk";
import type { CreateCourseRequest } from "cscheckin-js-sdk/dist/types";
import AuthStore from "../Database/Auth";
import useHttpBuilder from "./useHttpBuilder";

const auth = AuthStore.getCommonInstance();

export interface CreateCoursePayload extends CreateCourseRequest {
  classroomId: string;
}

export const useCreateCourse = (payload: CreateCoursePayload) =>
  useHttpBuilder(
    "course/create_course",
    async (_, inAuth, { classroomId, ...request }) =>
      CreateCourse(classroomId, request, inAuth),
    auth.Auth,
    payload
  );

export const useClassroomsList = () =>
  useHttpBuilder(
    "course/get_classrooms_list",
    async (_, inAuth) => GetClassroomsList(inAuth),
    auth.Auth
  );

export const useCourseInfoById = (courseId: number) =>
  useHttpBuilder(
    "course/get_course_by_id",
    async (_, inAuth, inCourseId) => GetCourseByID(inCourseId, inAuth),
    auth.Auth,
    courseId
  );

export const useCourseInfoByUUID = (courseUUID: string) =>
  useHttpBuilder(
    "course/get_course_by_uuid",
    async (_, _auth, inCourseUUID) => GetCourseByUUID(inCourseUUID),
    null,
    courseUUID
  );

export const useCoursesList = () =>
  useHttpBuilder(
    "course/get_courses_list",
    async (_, inAuth) => GetCoursesList(inAuth),
    auth.Auth
  );

export const useCourseShareLink = (courseId: number) =>
  useHttpBuilder(
    "course/get_share_link",
    async (_, inAuth, inCourseId) => GetShareLink(inCourseId, inAuth),
    auth.Auth,
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

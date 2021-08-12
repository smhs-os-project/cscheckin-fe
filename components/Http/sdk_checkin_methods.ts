import { Checkin, CheckinList } from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import { useEffect, useState } from "react";
import type { CheckinResponse } from "cscheckin-js-sdk/dist/types";
import useError from "../Hooks/useError";
import useHttpBuilder from "./useHttpBuilder";
import type { HttpResponse } from "./HttpResponse";

export const useCheckin = (
  uuid: string,
  auth: CSCAuth
): HttpResponse<CheckinResponse> => {
  const [error, setError] = useError();
  const [data, setData] = useState<CheckinResponse>();

  useEffect(() => {
    if (!data && !error)
      void Checkin(uuid, auth)
        .then((response) => setData(response))
        .catch((recvError: unknown) => setError(recvError));
  }, [auth, uuid, setError, data, error]);

  return {
    data: data ?? null,
    error,
    pending: !data && !error,
  };
};

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

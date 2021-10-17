import React, { useEffect } from "react";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import NProgress from "nprogress";
import { SyncCourseMembers } from "cscheckin-js-sdk";
import { useSWRConfig } from "swr";
import Swal from "sweetalert2";
import BaseButton from "../../../Elements/Button/BaseButton";
import useError from "../../../Hooks/useError";

export interface RefreshListButtonProps {
  courseId: number;
  auth: CSCAuth;
}

export default function RefreshListButton({
  auth,
  courseId,
}: RefreshListButtonProps) {
  const [error, setError] = useError();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (error) void Swal.fire("無法重新整理名單。", error.message, "error");
  });

  return (
    <BaseButton
      onClick={async () => {
        NProgress.start();
        try {
          await SyncCourseMembers(courseId, auth);
          await mutate(["teacher/checkin_list", auth, courseId]);
        } catch (e: unknown) {
          setError(e);
        }
        NProgress.done();
      }}
    >
      重新整理名單
    </BaseButton>
  );
}

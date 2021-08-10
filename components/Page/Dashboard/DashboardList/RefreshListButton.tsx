import React, { useEffect } from "react";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import NProgress from "nprogress";
import { SyncCourseMembers } from "cscheckin-js-sdk";
import { mutate } from "swr";
import Swal from "sweetalert2";
import BaseButton from "../../../Elements/Button/BaseButton";
import useError from "../../../../utilities/ErrorReporting/useError";

export interface RefreshListButtonProps {
  classroomId: number;
  auth: CSCAuth;
}

export default function RefreshListButton({
  auth,
  classroomId,
}: RefreshListButtonProps) {
  const [error, setError] = useError();

  useEffect(() => {
    if (error) void Swal.fire("無法重新整理名單。", error.message, "error");
  });

  return (
    <BaseButton
      onClick={async () => {
        NProgress.start();
        try {
          await SyncCourseMembers(classroomId, auth);
          await mutate(["teacher/checkin_list", auth, classroomId]);
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

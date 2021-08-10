import React, { useEffect } from "react";
import { ShareToClassroom } from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import NProgress from "nprogress";

import Swal from "sweetalert2";
import LargeButton from "../../../Elements/Button/LargeButton";
import useError from "../../../../utilities/ErrorReporting/useError";

export interface CloseCourseButtonProps {
  cid: number;
  auth: CSCAuth;
}

export default function CloseCourseButton({
  cid,
  auth,
}: CloseCourseButtonProps) {
  const [error, setError] = useError();

  useEffect(() => {
    if (error) void Swal.fire("無法關閉課程。", error.message, "error");
  }, [error]);

  return (
    <LargeButton
      full
      solid
      solidBorderColor="border-negative"
      backgroundColor="bg-negative"
      onClick={async () => {
        NProgress.start();

        try {
          await ShareToClassroom(cid, auth);
        } catch (e: unknown) {
          setError(e);
        }

        NProgress.done();
      }}
    >
      結束簽到
    </LargeButton>
  );
}

import React, { useEffect } from "react";
import { ShareToClassroom } from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import NProgress from "nprogress";
import Swal from "sweetalert2";
import useError from "../../../../utilities/ErrorReporting/useError";
import FullWidthButton from "../../../Elements/Button/FullWidthButton";

export interface ClassroomShareButtonProps {
  cid: number;
  auth: CSCAuth;
}

export default function ClassroomShareButton({
  cid,
  auth,
}: ClassroomShareButtonProps) {
  const [error, setError] = useError();

  useEffect(() => {
    if (error)
      void Swal.fire("無法分享課程至 Classroom。", error.message, "error");
  }, [error]);

  return (
    <FullWidthButton
      rightIcon
      onClick={async () => {
        NProgress.start();

        try {
          await ShareToClassroom(cid, auth);
          await Swal.fire("分享成功！", "", "success");
        } catch (e: unknown) {
          setError(e);
        }

        NProgress.done();
      }}
    >
      分享至 Classroom
    </FullWidthButton>
  );
}

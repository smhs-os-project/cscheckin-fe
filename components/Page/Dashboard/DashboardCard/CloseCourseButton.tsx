import React, { useEffect } from "react";
import { CloseCourse } from "cscheckin-js-sdk";
import type CSCAuth from "cscheckin-js-sdk/dist/auth";
import NProgress from "nprogress";
import Swal from "sweetalert2";
import { mutate } from "swr";
import LargeButton from "../../../Elements/Button/LargeButton";
import useError from "../../../../utilities/ErrorReporting/useError";

export interface CloseCourseButtonProps {
  courseId: number;
  auth: CSCAuth;
}

export default function CloseCourseButton({
  courseId,
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
          const response = await CloseCourse(courseId, auth);
          if (response) {
            await Promise.all([
              Swal.fire("成功關閉課程！", "", "success"),
              await mutate(["course/get_course_by_id", auth, courseId]),
            ]);
          } else await Swal.fire("操作失敗。", "", "warning");
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

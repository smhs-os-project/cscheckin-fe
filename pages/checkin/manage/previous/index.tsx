import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { GetCoursesList } from "cscheckin-js-sdk";
import { useRouter } from "next/router";
import type { CourseListResponse } from "cscheckin-js-sdk/dist/types";
import ListChoicePageCard from "../../../../components/Page/ListChoicePageCard";
import useError from "../../../../utilities/useError";
import useAuth from "../../../../components/AuthStore/useAuth";
import ErrorPage from "../../../../components/Page/ErrorPage";

export default function CSCManagePrevious() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useError();
  const { auth, error: authError } = useAuth();
  const { data, error: respError } = useSWR<CourseListResponse | null, unknown>(
    ["course.get_courses_list", auth],
    async (_, iAuth: typeof auth) => {
      if (iAuth) return GetCoursesList(iAuth);
      return null;
    }
  );

  useEffect(() => {
    if (respError instanceof Error) {
      setError({
        message: "無法取得簽到名單。",
        details: respError.message,
      });
    } else if (respError) {
      setError({
        message: "無法取得簽到名單。",
        details: `${respError}`,
      });
    }
  }, [respError]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      setMessage("正在取得資料⋯⋯");
    } else {
      setMessage(null);
    }
  }, [data]);

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <ListChoicePageCard
      id="csc-manage-previous"
      title="查看以往簽到記錄"
      desc="依時間由上往下排序。"
      icon={faSearch}
      message={message}
    >
      {data
        ?.sort(
          (el1, el2) =>
            el2.start_timestamp.getTime() - el1.start_timestamp.getTime()
        )
        .map(({ id, name, google_classroom_id, start_timestamp }) => ({
          id: `${name}-${google_classroom_id}-${start_timestamp}`,
          name: `${name} (${start_timestamp.toLocaleString()})`,
          redirect: async () => router.push(`/checkin/manage/dashboard/${id}`),
        })) ?? []}
    </ListChoicePageCard>
  );
}

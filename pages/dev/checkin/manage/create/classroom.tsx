import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { GetClassroomsList } from "cscheckin-js-sdk";
import type { GClassroomListResponse } from "cscheckin-js-sdk/dist/types";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import ListChoicePageCard from "../../../../../components/Page/ListChoicePageCard";
import useError from "../../../../../utilities/useError";
import useAuth from "../../../../../components/AuthStore/useAuth";
import ErrorPage from "../../../../../components/Page/ErrorPage";

export default function CSCManageCreateClassroom() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const { auth, error: authError } = useAuth();
  const [error, setError] = useError();
  const { data, error: listError } = useSWR<
    GClassroomListResponse | null,
    unknown
  >(["sdk.logic.get_classrooms_list", auth, error], async (_, theAuth, err) => {
    if (theAuth && !err) return GetClassroomsList(theAuth);
    return null;
  });

  useEffect(() => {
    if (error) {
      NProgress.done();
    } else if (data) {
      if (data.length > 0) {
        NProgress.done();
        setMessage(null);
      } else {
        setMessage("無資料。");
      }
    } else {
      NProgress.start();
      setMessage("正在取得資料⋯⋯");
    }
  }, [data, error]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  useEffect(() => {
    if (listError instanceof Error) {
      setError({
        message: "無法查詢 Classroom 清單",
        details: listError.message,
      });
    } else if (listError) {
      setError({
        message: "無法查詢 Classroom 清單",
        details: `${listError}`,
      });
    }
  }, [listError]);

  if (error) {
    return (
      <ErrorPage
        errorMessage={error.message}
        errorDetails={error.details ?? "選擇開課教室時發生未知錯誤。"}
      />
    );
  }

  return (
    <ListChoicePageCard
      id="csc-manage-create-classroom"
      title="選擇開課教室"
      desc="也就是開啟 Google Meet 和學生所在的 Google Classroom"
      icon={faSearch}
      message={message}
    >
      {Array.isArray(data)
        ? data.map(({ google_classroom_id, name }) => ({
            id: `${name}-${google_classroom_id}`,
            name,
            redirect: async () => {
              await router.push(
                `/checkin/manage/create/${google_classroom_id}/instant`
              );
            },
          }))
        : []}
    </ListChoicePageCard>
  );
}

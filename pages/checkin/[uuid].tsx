import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Checkin } from "cscheckin-js-sdk";
import type { CheckinResponse } from "cscheckin-js-sdk/dist/types";
import NProgress from "nprogress";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import ErrorPage from "../../components/Page/ErrorPage";
import useAuth from "../../components/AuthStore/useAuth";
import useError from "../../utilities/useError";
import RefreshButton from "../../components/BaseElements/RefreshButton";
import { Scope } from "../../components/GoogleLoginComponent/LoginComponent";
import useRedirect from "../../utilities/useRedirect";
import SessionDB from "../../components/SessionDB";
import { checkinData } from "../../components/SessionDB/consts";

const sdb = SessionDB.getInstance();

export function InnerCSCStudentCheckin({ uuid }: { uuid: string }) {
  const [error, setError] = useError();
  const { redirect } = useRedirect("/checkin/success");
  const { auth, error: authError } = useAuth(true, Scope.Student);
  const { data, error: respError } = useSWR<CheckinResponse | null, unknown>(
    ["student.checkin", uuid, auth],
    async (_, iUUID: typeof uuid, iAuth: typeof auth) => {
      if (iAuth) {
        return Checkin(iUUID, iAuth);
      }
      return null;
    }
  );

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError, setError]);

  useEffect(() => {
    if (respError instanceof Error) {
      setError({
        message: "您未加入這間教室，或已經結束簽到。",
        details: `伺服器端拒絕本次簽到請求。可能是因為您未加入這間教室，或已經結束簽到。錯誤代碼：${respError.message}`,
      });
    } else if (respError) {
      setError({
        message: "無法簽到。",
        details: `${respError}`,
      });
    }
  }, [respError, setError]);

  useEffect(() => {
    if (data) {
      NProgress.done();
      sdb.setObj(checkinData, data);
      void redirect();
    }
  }, [data, redirect]);

  if (error) {
    NProgress.done();
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  NProgress.start();
  return (
    <HeaderPageCard
      id="checkin-student"
      title={`正在簽到「${uuid}」課程⋯⋯`}
      desc="很快就會完成。請稍候～"
      headerColor="blue-900"
      icon={faCheck}
    >
      <p>如超過 10 秒無反應，請點選下方按鈕重新整理。</p>
      <p>若問題持續，請按右下角「回報問題」告知我們。</p>
      <RefreshButton className="mt-3" />
    </HeaderPageCard>
  );
}

export default function CSCStudentCheckin() {
  const router = useRouter();
  const { uuid } = router.query;

  if (!router.isReady) {
    return null;
  }
  if (typeof uuid !== "string") {
    return (
      <ErrorPage
        errorMessage="無法進入簽到頁面。"
        errorDetails="uuid 參數不是字串。"
      />
    );
  }

  return <InnerCSCStudentCheckin uuid={uuid} />;
}

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import type {
  AuthUserResponse,
  CheckinResponse,
} from "cscheckin-js-sdk/dist/types";
import { CheckinResponseSchema } from "cscheckin-js-sdk/dist/types";
import { ValidationError } from "myzod";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import useAuth from "../../components/AuthStore/useAuth";
import { Scope } from "../../components/GoogleLoginComponent/LoginComponent";
import SessionDB from "../../components/SessionDB";
import { checkinData } from "../../components/SessionDB/consts";
import ErrorPage from "../../components/Page/ErrorPage";
import getStateBrief from "../../utilities/getStateBrief";

const sdb = SessionDB.getInstance();

export function InnerCSCStudentCheckinSuccess({
  data: cdata,
}: {
  data: CheckinResponse;
}) {
  const { auth } = useAuth(true, Scope.Student);
  const [userInfo, setUserInfo] = useState<AuthUserResponse | null>(null);

  useEffect(() => {
    if (auth) {
      void auth.userInfo().then(setUserInfo);
    }
  }, [auth]);

  return (
    <HeaderPageCard
      id="checkin-student-success"
      title="Perfect!"
      desc="簽到完成。您可保存此簽到憑據。"
      headerColor="green-900"
      icon={faCheck}
    >
      {userInfo ? (
        <>
          <p>課程 ID：{cdata.course_id}</p>
          <p>簽到狀態：{getStateBrief(cdata.state)}</p>
          <p>姓名：{userInfo.name}</p>
          <p>信箱：{userInfo.email}</p>
        </>
      ) : (
        <p>正在載入身分資訊⋯⋯</p>
      )}

      <p>時間：{new Date().toLocaleString()}</p>
    </HeaderPageCard>
  );
}

export default function CSCStudentCheckinSuccess() {
  const [data, setData] = useState<CheckinResponse | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(
      sdb.getObj(
        checkinData,
        (val: unknown): val is CheckinResponse =>
          !(CheckinResponseSchema.try(val) instanceof ValidationError)
      )
    );
    setReady(true);
  }, [setData]);

  if (!ready) return null;

  if (data) {
    sdb.remove(checkinData);
    return <InnerCSCStudentCheckinSuccess data={data} />;
  }
  return (
    <ErrorPage
      errorMessage="在簽到之前，您不能進入簽到完成介面。"
      errorDetails={`session 沒有 ${checkinData} 這個 key`}
    />
  );
}

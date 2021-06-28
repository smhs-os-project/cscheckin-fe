import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import type { AuthUserResponse } from "cscheckin-js-sdk/dist/types";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import useAuth from "../../components/AuthStore/useAuth";
import { Scope } from "../../components/GoogleLoginComponent/LoginComponent";

export default function CSCStudentCheckinSuccess() {
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

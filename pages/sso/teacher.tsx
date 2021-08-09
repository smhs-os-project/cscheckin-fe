import React from "react";
import dynamic from "next/dynamic";
import { Scope } from "../../components/OAuth/Google/scope";

const LoginUI = dynamic(() => import("../../components/OAuth/Google/LoginUI"));

export default function SSOTeacher() {
  return (
    <LoginUI
      pageTitle="SSO 教師登入系統"
      pageDesc="登入後即可監控學生的簽到情況及管理簽到連結。"
      scope={Scope.Teacher}
    />
  );
}

import React from "react";
import dynamic from "next/dynamic";
import { Scope } from "../../components/OAuth/Google/scope";

const LoginUI = dynamic(() => import("../../components/OAuth/Google/LoginUI"));
export default function SSOStudentPage() {
  return (
    <LoginUI
      pageTitle="SSO 學生登入系統"
      pageDesc="登入後即可進行簽到並設定班級座號。"
      scope={Scope.Student}
    />
  );
}

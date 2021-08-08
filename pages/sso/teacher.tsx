import React from "react";
import LoginUI from "../../components/OAuth/Google/LoginUI";
import { Scope } from "../../components/OAuth/Google/scope";

export default function SSOTeacher() {
  return (
    <LoginUI
      pageTitle="SSO 教師登入系統"
      pageDesc="登入一次，簽到無數次。"
      scope={Scope.Teacher}
    />
  );
}

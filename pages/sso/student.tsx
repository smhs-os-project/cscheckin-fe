import React from "react";
import LoginUI from "../../components/OAuth/Google/LoginUI";
import { Scope } from "../../components/OAuth/Google/scope";

export default function SSOStudentPage() {
  return <LoginUI pageTitle="SSO 學生登入系統" scope={Scope.Student} />;
}

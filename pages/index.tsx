import React from "react";
import LoginComponent from "../components/GoogleLoginComponent/LoginComponent";
import BasePage from "../components/Page/BasePage";

export default function Home() {
  return (
    <BasePage id="home" title="首頁" full>
      <h1 className="text-3xl font-bold pb-1">登入系統</h1>
      <h2 className="text-xl pb-4">讓你對各個學生的出缺席情況暸若指掌。</h2>
      <LoginComponent
        onLogin={() => undefined}
        onLogout={() => undefined}
        onFailure={() => undefined}
      />
    </BasePage>
  );
}

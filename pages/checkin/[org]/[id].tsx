import { useRouter } from "next/router";
import React from "react";
import LoginComponent from "../../../components/GoogleLoginComponent/LoginComponent";
import BasePage from "../../../components/Page/BasePage";

export default function Checkin() {
  const router = useRouter();
  const { org, id } = router.query as Record<string, string>;

  return (
    <BasePage id="checkin" title="簽到" full>
      <h1 className="text-3xl font-bold pb-1">簽到</h1>
      <h2 className="text-xl pb-4">
        簽到 {org} 的「{id}」課程。
      </h2>
      <LoginComponent
        org={org}
        onLogin={() => undefined}
        onLogout={() => undefined}
        onFailure={() => undefined}
        loginText="簽到課程"
      />
    </BasePage>
  );
}

import { useRouter } from "next/router";
import React from "react";
import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import BasePage from "../../../components/Page/BasePage";

export default function Checkin() {
  const router = useRouter();
  const { org, id } = router.query as Record<string, string>;

  return (
    <BasePage id="checkin" title="簽到" full>
      <h1 className="pb-1 text-3xl font-bold">簽到</h1>
      <h2 className="pb-4 text-xl">
        簽到 {org} 的「{id}」課程。
      </h2>
      <LoginComponent
        org={org}
        scope={Scope.Student}
        onLogin={() => undefined}
        onLogout={() => undefined}
        onFailure={() => undefined}
        loginText="簽到課程"
      />
    </BasePage>
  );
}

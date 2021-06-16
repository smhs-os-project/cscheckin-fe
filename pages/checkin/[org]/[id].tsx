import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import { useRouter } from "next/router";
import React from "react";
import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

export default function Checkin() {
  const router = useRouter();
  const { org, id } = router.query;
  const handler = async () => {};

  if (org && id && typeof org === "string" && typeof id === "string")
    return (
      <HeaderPageCard
        id="student-checkin-portal"
        title="學生簽到系統"
        desc={`簽到${id}課。`}
        contentPadding={false}
      >
        <div className="flex content-center justify-center w-full p-10">
          <LoginComponent
            // we assumed user sent the valid organization,
            // since we will check if it is valid within LoginComponent.
            org={org as Organization}
            scope={Scope.Student}
            onLogin={handler}
            onLogout={handler}
            onFailure={handler}
            loginText={`簽到${id}`}
          />
        </div>
      </HeaderPageCard>
    );

  return null;
}

import { useRouter } from "next/router";
import React from "react";
import LoginComponent, {
  Scope,
} from "../../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../../components/Page/HeaderPageCard";

export default function Checkin() {
  const router = useRouter();
  const { org, id } = router.query as Record<string, string>;
  const handler = () => {};

  return (
    <HeaderPageCard
      id="student-checkin-portal"
      title="學生簽到系統"
      desc={`簽到${id}課。`}
      contentPadding={false}
    >
      <div className="flex content-center justify-center w-full p-10">
        <LoginComponent
          org={org}
          scope={Scope.Teacher}
          onLogin={handler}
          onLogout={handler}
          onFailure={handler}
          loginText={`簽到${id}`}
        />
      </div>
    </HeaderPageCard>
  );
}

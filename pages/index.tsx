import React, { useState } from "react";

import { getClientIdList } from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function Home() {
  const availableSchool = Object.keys(getClientIdList());
  const [cc, setCC] = useState("");
  const handler = () => undefined;

  const pageId = "teacher-login-portal";
  const pageTitle = "教師登入系統";
  const pageDesc = "讓你對各個學生的出缺席情況暸若指掌。";

  if (cc !== "")
    return (
      <HeaderPageCard
        id={pageId}
        title={pageTitle}
        desc={pageDesc}
        contentPadding={false}
      >
        <section className="flex content-center justify-center w-full p-10">
          <LoginComponent
            org={cc}
            scope={Scope.Teacher}
            onLogin={handler}
            onLogout={handler}
            onFailure={handler}
            loginText={`${cc}登入區`}
          />
        </section>
      </HeaderPageCard>
    );

  return (
    <ListChoicePageCard id={pageId} title={pageTitle} desc={pageDesc}>
      {availableSchool.map((school) => ({
        id: school,
        name: school,
        redirect: () => setCC(school),
      }))}
    </ListChoicePageCard>
  );
}

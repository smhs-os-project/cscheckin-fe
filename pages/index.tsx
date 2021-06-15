import type { OrgInfoListResponse } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";
import React, { useState } from "react";

import getClientIdList from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function Home() {
  const [cc, setCC] = useState("");
  const [clientIdList, setClientIdList] = useState<OrgInfoListResponse>([]);
  const handler = console.log;

  const pageId = "teacher-login-portal";
  const pageTitle = "教師登入系統";
  const pageDesc = "讓你對各個學生的出缺席情況暸若指掌。";

  useState(async () => {
    setClientIdList(await getClientIdList());
  });

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
      {clientIdList.map(({ chinese_name, client_id }) => ({
        id: chinese_name, // TODO: api: returns ID
        name: chinese_name,
        redirect: () => setCC(client_id),
      }))}
    </ListChoicePageCard>
  );
}

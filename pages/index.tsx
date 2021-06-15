import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import React, { useState } from "react";

import getClientIdList from "../components/GoogleLoginComponent/getClientIdList";
import type { MappedOrgInfoListResponse } from "../components/GoogleLoginComponent/idNameMap";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function Home() {
  const [cc, setCC] = useState<Organization | null>(null);
  const [clientIdList, setClientIdList] =
    useState<MappedOrgInfoListResponse | null>(null);
  const handler = console.log;

  const pageId = "teacher-login-portal";
  const pageTitle = "教師登入系統";
  const pageDesc = "讓你對各個學生的出缺席情況暸若指掌。";

  useState(async () => {
    setClientIdList(await getClientIdList());
  });

  if (cc)
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

  if (clientIdList)
    return (
      <ListChoicePageCard id={pageId} title={pageTitle} desc={pageDesc}>
        {clientIdList.map(({ id, chinese_name }) => ({
          id,
          name: chinese_name,
          redirect: () => setCC(id),
        }))}
      </ListChoicePageCard>
    );

  return (
    <HeaderPageCard id={pageId} title={pageTitle} desc={pageDesc}>
      <p className="text-black">正在取得資料⋯⋯</p>
    </HeaderPageCard>
  );
}

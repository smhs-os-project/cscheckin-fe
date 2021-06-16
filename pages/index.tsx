import type { Organization } from "cscheckin-js-sdk/dist/types/auth/req_auth_token";
import type { OrgInfoListResponse } from "cscheckin-js-sdk/dist/types/org_info/resp_org_info";
import router from "next/router";
import React, { useState, useEffect } from "react";
import NProgress from "nprogress";
import { useAuth } from "../components/AuthStore/utilities";
import getClientIdList from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import ListChoicePageCard from "../components/Page/ListChoicePageCard";

export default function Home() {
  const [auth] = useAuth();
  // cc = client id
  const [cc, setCC] = useState<Organization | null>(null);
  // ccn = client chinese name
  const [ccn, setCCN] = useState<string | null>(null);
  const [clientIdList, setClientIdList] = useState<OrgInfoListResponse>([]);
  const pageId = "teacher-login-logout-portal";
  const pageTitle = "教師登入系統";
  const pageDesc = "讓你對各個學生的出缺席情況暸若指掌。";

  useEffect(() => {
    void (async () => {
      NProgress.start();
      setClientIdList(await getClientIdList());
      NProgress.done();
    })();
  }, []);

  useEffect(() => {
    if (auth) void router.push("/admin");
  }, [auth]);

  if (cc && ccn)
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
            onLogin={async () => {
              await router.push("/admin");
            }}
            loginText={`${ccn}登入區`}
          />
        </section>
      </HeaderPageCard>
    );

  return (
    <ListChoicePageCard id={pageId} title={pageTitle} desc={pageDesc}>
      {clientIdList.map(({ id, chinese_name }) => ({
        id,
        name: chinese_name,
        redirect: () => {
          setCC(id);
          setCCN(chinese_name);
        },
      }))}
    </ListChoicePageCard>
  );
}

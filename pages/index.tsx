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

enum Stage {
  FAILED = -1,
  PREPARING,
  CHOOSE_SCHOOL,
  GOOGLE_LOGIN,
  HAVE_LOGIN,
}

export default function Home() {
  const pageId = "teacher-login-portal";
  const pageTitle = "教師登入系統";
  const pageDesc = "讓你對各個學生的出缺席情況暸若指掌。";

  const [auth] = useAuth();
  const [stage, setStage] = useState(Stage.PREPARING);
  // cc = client id
  const [cc, setCC] = useState<Organization | null>(null);
  const [clientIdList, setClientIdList] = useState<OrgInfoListResponse>([]);

  // Get the client ID
  useEffect(() => {
    void (async () => {
      NProgress.start();
      setClientIdList(await getClientIdList());
      NProgress.done();
      setStage(Stage.CHOOSE_SCHOOL);
    })();
  }, []);

  // Redirect to dashboard if the user has been on login.
  useEffect(() => {
    if (auth) setStage(Stage.HAVE_LOGIN);
  }, [auth]);

  switch (stage) {
    case Stage.PREPARING:
      return (
        <HeaderPageCard id={pageId} title={pageTitle} desc={pageDesc}>
          <p>正在取得服務清單。請稍候⋯⋯</p>
        </HeaderPageCard>
      );
    case Stage.CHOOSE_SCHOOL:
      return (
        <ListChoicePageCard id={pageId} title={pageTitle} desc={pageDesc}>
          {clientIdList.map(({ id, chinese_name }) => ({
            id,
            name: chinese_name,
            redirect: () => {
              setCC(id);
              setStage(Stage.GOOGLE_LOGIN);
            },
          }))}
        </ListChoicePageCard>
      );
    case Stage.GOOGLE_LOGIN: {
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
                onLogin={async () => {
                  setStage(Stage.HAVE_LOGIN);
                }}
              />
            </section>
          </HeaderPageCard>
        );
      setStage(Stage.FAILED);
      break;
    }
    case Stage.HAVE_LOGIN: {
      void router.push("/admin");
      break;
    }
    default:
      // Stage.FAILED
      break;
  }

  return <p>⚠️ 發生未知錯誤。</p>;
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import type { OrgInfoListResponse } from "cscheckin-js-sdk/dist/types";
import { Organization } from "cscheckin-js-sdk/dist/types";
import myzod, { ValidationError } from "myzod";
import Link from "next/link";
import Sentry from "../../utilities/sentry";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";
import getClientIdList from "../../components/GoogleLoginComponent/getClientIdList";
import { ErrorMessageEndJsx } from "../../components/MessageConsts";
import LoginComponent, {
  Scope,
} from "../../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

const id = "csc-login";

enum Stage {
  FAILED = -1,
  INITIATE,
  CHOOSE_ORG,
  LOGIN,
  COMPLETE,
}

function SSOChooseOrgView({
  title,
  desc,
  orgList,
  setOrg,
}: {
  title: string;
  desc: string | undefined;
  orgList: OrgInfoListResponse;
  setOrg: (org: Organization) => void;
}) {
  return (
    <ListChoicePageCard
      id={`${id}-choose-org`}
      title={title}
      desc={desc ?? "請選擇您 Google 帳戶的隸屬學校。"}
    >
      {orgList.map(({ id: oid, chinese_name }) => ({
        id: oid,
        name: chinese_name,
        redirect: () => {
          setOrg(oid);
        },
      }))}
    </ListChoicePageCard>
  );
}

function SSOLoginView({
  title,
  desc,
  org,
  scope,
  loginText,
  onLogin,
}: {
  title: string;
  desc: string | undefined;
  org: Organization;
  scope: Scope;
  loginText: string;
  onLogin: () => Promise<void>;
}) {
  return (
    <HeaderPageCard
      id={`${id}-login`}
      title={title}
      desc={desc ?? "請使用隸屬組織的 Google 帳戶登入。"}
    >
      {" "}
      <LoginComponent
        org={org}
        scope={scope}
        loginText={loginText}
        onLogin={onLogin}
      />
    </HeaderPageCard>
  );
}

function SSOErrorView({ message }: { message: string | null }) {
  return (
    <HeaderPageCard
      id={`${id}-failed`}
      title="登入失敗"
      desc="登入程序被打斷，或是系統發生錯誤。"
    >
      <p className="font-bold break-all w-96">
        {message ?? "發生未定義的內部錯誤。"}
      </p>
      <div className="mt-2 break-all w-96">{ErrorMessageEndJsx}</div>
    </HeaderPageCard>
  );
}

export default function SSOLogin() {
  const router = useRouter();

  const {
    // all of them are the query strings
    redirect = null,
    title = "登入 CSC 簽到系統",
    description,
    org,
    scope, // student, [teacher]
  } = router.query;

  const [stage, setStage] = useState(Stage.INITIATE);
  const [message, setMessage] = useState<string | null>(null);
  const [orgList, setOrgList] = useState<OrgInfoListResponse | null>(null);
  const [theOrg, setTheOrg] = useState<Organization | null>(null);

  const getScope = () => {
    if (typeof scope === "string") {
      switch (scope) {
        case "teacher":
          return Scope.Teacher;
        case "student":
          return Scope.Student;
        default:
          Sentry.captureMessage(
            "指定的 Scope 權限範圍無效。",
            Sentry.Severity.Error
          );
          setMessage("指定的 Scope 權限範圍無效。");
          setStage(Stage.FAILED);
      }
    }

    return Scope.Teacher;
  };

  // Stage
  useEffect(() => {
    // query strings should be always checked
    // regardless of its current stage.
    if (
      stage !== Stage.FAILED &&
      (Array.isArray(redirect) ||
        Array.isArray(title) ||
        Array.isArray(description) ||
        Array.isArray(org))
    ) {
      setStage(Stage.FAILED);
      Sentry.captureMessage(
        "發生系統內部錯誤。已通知開發者，請回到首頁或是 Classroom 重新登入。",
        Sentry.Severity.Error
      );
      setMessage(
        "發生系統內部錯誤。已通知開發者，請回到首頁或是 Classroom 重新登入。"
      );
      return;
    }

    switch (stage) {
      case Stage.INITIATE:
        NProgress.start();

        void getClientIdList()
          .then(setOrgList)
          .then(() => setStage(Stage.CHOOSE_ORG));
        break;
      case Stage.CHOOSE_ORG:
        // check if the user specified the
        // organization in query string
        if (org) {
          const checkedOrg = myzod.enum(Organization).try(org);
          if (!(checkedOrg instanceof ValidationError)) {
            setTheOrg(checkedOrg);
            setStage(Stage.LOGIN);
            break;
          }
        }

        if (theOrg) {
          setStage(Stage.LOGIN);
          break;
        }

        NProgress.done();
        break;
      case Stage.COMPLETE:
        NProgress.done();
        if (typeof redirect === "string") {
          void router.push(decodeURIComponent(redirect));
        }
        break;
      case Stage.LOGIN:
      case Stage.FAILED:
        NProgress.done();
        break;
      default:
        break;
    }
  }, [redirect, title, description, org, stage, theOrg]);

  // views
  switch (stage) {
    case Stage.FAILED:
      Sentry.captureMessage("sso-login: 進入錯誤畫面", Sentry.Severity.Info);
      return <SSOErrorView message={message} />;
    case Stage.CHOOSE_ORG:
      if (typeof title === "string" && !Array.isArray(description) && orgList) {
        return (
          <SSOChooseOrgView
            title={title}
            desc={description}
            orgList={orgList}
            setOrg={setTheOrg}
          />
        );
      }

      return (
        <HeaderPageCard
          id={`${id}-choose-org-waiting`}
          title="正在等待資料⋯⋯"
          desc="stage: CHOOSE_ORG"
        >
          <p>Waiting: title 變成 string，description 有 orgList</p>
          <p>
            若畫面卡在這裡超過 5
            秒，請務必截圖，並使用「問題回報」功能告知我們。
          </p>
        </HeaderPageCard>
      );
    case Stage.LOGIN:
      if (theOrg && typeof title === "string" && !Array.isArray(description)) {
        return (
          <SSOLoginView
            title={title}
            desc={description}
            org={theOrg}
            scope={getScope()}
            loginText={title}
            onLogin={async () => {
              setStage(Stage.COMPLETE);
            }}
          />
        );
      }

      return (
        <HeaderPageCard
          id={`${id}-login-waiting`}
          title="正在等待資料⋯⋯"
          desc="stage: LOGIN"
        >
          <p>Waiting: org, scope 存在，title 變成 string，有 orgList</p>
          <p>
            若畫面卡在這裡超過 5
            秒，請務必截圖，並使用「問題回報」功能告知我們。
          </p>
        </HeaderPageCard>
      );
    case Stage.COMPLETE:
      return (
        <HeaderPageCard
          id={`${id}-login-complete`}
          title="登入完成！"
          desc="即將回到原畫面。"
        >
          {typeof redirect === "string" ? ( // we will redirect if this query string is string
            <>
              <p>如時間內未重新導向，請點選下方連結：</p>
              <p className="text-blue-500 underline w-96">
                <Link href={redirect}>{redirect}</Link>
              </p>
            </>
          ) : (
            <>
              <p>我們沒有原畫面的資料以致不能返回。</p>
              <p>請按左上角「I」進入管理與設定頁面。</p>
            </>
          )}
        </HeaderPageCard>
      );
    default:
      break;
  }

  return null; // consider it not loaded
}

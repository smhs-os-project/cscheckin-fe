import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthStore/utilities";
import BaseButton from "../../components/BaseElements/BaseButton";
import BaseInput from "../../components/BaseElements/BaseInput";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import Sentry from "../../utilities/sentry";

enum Stage {
  FAILED = -1,
  LOADING,
  USER_INPUT,
  SUBMIT,
  SUCCESS,
}

export default function UserRegister() {
  const pageId = "user-register";
  const pageTitle = "更新班級座號資料";
  const pageDesc = "僅需輸入一次。";

  const router = useRouter();
  const { redirect } = router.query;

  const [auth, loading] = useAuth();
  const [stage, setStage] = useState(Stage.LOADING);
  const [message, setMessage] = useState<string | null>(null);
  const [theClass, setTheClass] = useState("");
  const [no, setNo] = useState("");

  const messageElement = (m: string) => (
    <HeaderPageCard id={pageId} title={pageTitle} desc={pageDesc}>
      {m}
    </HeaderPageCard>
  );

  useEffect(() => {
    if (!auth && !loading) {
      setStage(Stage.FAILED);
      Sentry.captureMessage(
        "未登入。請回到原始畫面重新登入！",
        Sentry.Severity.Error
      );
      setMessage("未登入。請回到原始畫面重新登入！");
    } else if (auth && !loading) setStage(Stage.USER_INPUT);
  }, [auth, loading]);

  switch (stage) {
    case Stage.LOADING:
      Sentry.captureMessage("正在檢查登入狀態⋯⋯", Sentry.Severity.Debug);
      return messageElement("正在檢查登入狀態⋯⋯");
    case Stage.FAILED:
      Sentry.captureMessage(message ?? "發生未知錯誤。", Sentry.Severity.Error);
      return messageElement(message ?? "發生未知錯誤。");
    case Stage.SUCCESS:
      Sentry.captureMessage(
        `設定完成 (redirect: ${redirect ?? "NONE"})`,
        Sentry.Severity.Debug
      );

      if (typeof redirect === "string") {
        void router.push(redirect);
        return messageElement("設定完成。正在返回原頁面⋯⋯");
      }
      return messageElement("設定完成。");
    case Stage.USER_INPUT:
    case Stage.SUBMIT:
    default:
      break;
  }

  return (
    <HeaderPageCard id={pageId} title={pageTitle} desc={pageDesc}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setStage(Stage.SUBMIT);
          const success = await auth?.setIdentity(theClass, no);

          if (success) {
            Sentry.captureMessage(
              `更新資料成功 (class: ${theClass}, number: ${no})`,
              Sentry.Severity.Debug
            );
            setStage(Stage.SUCCESS);
            return;
          }

          Sentry.captureMessage(
            "更新失敗。請確認您輸入的資料無誤後再試。",
            Sentry.Severity.Error
          );

          setMessage("更新失敗。請確認您輸入的資料無誤後再試。");
          setStage(Stage.FAILED);
        }}
      >
        <BaseInput
          id="class-field"
          label="班級"
          placeholder="ex. 101"
          value={theClass}
          onChange={setTheClass}
          required
        />
        <BaseInput
          id="no-field"
          label="座號"
          placeholder="ex. 13"
          value={no}
          onChange={setNo}
          required
        />
        <BaseButton
          submit
          className="mt-5"
          solid
          disabled={stage === Stage.SUBMIT}
        >
          更新資料
        </BaseButton>
      </form>
    </HeaderPageCard>
  );
}

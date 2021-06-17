import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthStore/utilities";
import BaseButton from "../components/BaseElements/BaseButton";
import BaseInput from "../components/BaseElements/BaseInput";
import HeaderPageCard from "../components/Page/HeaderPageCard";

enum Stage {
  FAILED = -1,
  LOADING,
  USER_INPUT,
  SUBMIT,
  SUCCESS,
}

export default function UserRegister() {
  const pageId = "user-register";
  const pageTitle = "使用者註冊";
  const pageDesc = "輸入班級與座號。";

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
      setMessage("未登入。請回到原始畫面重新登入！");
    } else if (auth && !loading) setStage(Stage.USER_INPUT);
  }, [auth, loading]);

  switch (stage) {
    case Stage.LOADING:
      return messageElement("正在檢查登入狀態⋯⋯");
    case Stage.FAILED:
      return messageElement(message ?? "發生未知錯誤。");
    case Stage.SUCCESS:
      return messageElement("註冊完成。正在返回原頁面⋯⋯");
    case Stage.USER_INPUT:
    case Stage.SUBMIT:
    default:
      break;
  }

  return (
    <HeaderPageCard
      id="user-register"
      title="使用者註冊"
      desc="輸入班級與座號。"
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setStage(Stage.SUBMIT);
          const success = await auth?.setIdentity(Number(theClass), Number(no));

          if (success) {
            setStage(Stage.SUCCESS);
            return;
          }

          setMessage("註冊失敗。請確認您輸入的資料無誤後再試。");
          setStage(Stage.FAILED);
        }}
      >
        <BaseInput
          id="no-field"
          label="班級"
          type="number"
          placeholder="ex. 101"
          value={theClass}
          onChange={setTheClass}
        />
        <BaseInput
          id="no-field"
          label="座號"
          type="number"
          placeholder="ex. 13"
          value={no}
          onChange={setNo}
        />
        <BaseButton
          submit
          className="mt-5"
          solid
          disabled={stage === Stage.SUBMIT}
        >
          註冊 REGISTER
        </BaseButton>
      </form>
    </HeaderPageCard>
  );
}

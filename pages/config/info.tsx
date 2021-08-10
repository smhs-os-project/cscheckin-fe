import React, { useEffect, useState } from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import useAuth from "../../components/Database/AuthStore/useAuth";
import { Scope } from "../../components/OAuth/Google/scope";
import type AuthenticatedPageProps from "../../components/Database/AuthStore/AuthenticatedPageProps";
import AuthErrorPage from "../../components/Database/AuthStore/AuthErrorPage";
import LoadingPage from "../../components/Page/LoadingPage";
import { useUserInfo } from "../../components/Http/sdk_auth_methods";
import useRedirect from "../../components/Hooks/useRedirect";

const BaseInput = dynamic(
  () => import("../../components/Elements/Input/BaseInput")
);
const LargeButton = dynamic(
  () => import("../../components/Elements/Button/LargeButton")
);
const LargeButtonGroup = dynamic(
  () => import("../../components/Elements/Button/Group/LargeButtonGroup")
);

function AuthenticatedConfigInfo({ auth }: AuthenticatedPageProps) {
  const { data: userInfo, error: userInfoError } = useUserInfo(auth);
  const [userClass, setUserClass] = useState<string>();
  const [userNumber, setUserNumber] = useState<string>();
  const [hasInitiated, setHasInitiated] = useState(false);
  const { redirect } = useRedirect("/config");

  useEffect(() => {
    if (!hasInitiated && userInfo && userInfo.student) {
      setUserClass(userInfo.student.class);
      setUserNumber(userInfo.student.number);
      setHasInitiated(true);
    }
  }, [auth, userClass, userNumber, hasInitiated, userInfo]);

  useEffect(() => {
    if (userInfoError) {
      void Swal.fire(
        "取得使用者資訊時發生錯誤。",
        userInfoError.message,
        "warning"
      );
    }
  }, [userInfoError]);

  return (
    <HeaderPageCard
      title="設定班級座號"
      desc="重新設定您的班級座號"
      icon={faCog}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (
            userClass &&
            userNumber &&
            userClass.length &&
            userNumber.length
          ) {
            const result = await auth.setIdentity(userClass, userNumber);

            if (result) {
              await Swal.fire("班級座號設定完成！", "", "success");
              await redirect();
            } else {
              await Swal.fire(
                "班級座號設定失敗 :(",
                "請檢查輸入內容是否正確，或試試看重新輸入。",
                "error"
              );
            }
          } else {
            await Swal.fire(
              "尚未輸入班級座號。",
              "請確實輸入班級座號後再按下儲存鍵。",
              "error"
            );
          }
        }}
      >
        <section className="grid grid-cols-2 gap-4 mb-4 w-full">
          <BaseInput label="班級" value={userClass} onChange={setUserClass} />
          <BaseInput label="座號" value={userNumber} onChange={setUserNumber} />
        </section>
        <LargeButtonGroup>
          <LargeButton solid full submit>
            儲存
          </LargeButton>
        </LargeButtonGroup>
      </form>
    </HeaderPageCard>
  );
}

export default function ConfigInfo() {
  const { auth, error } = useAuth(Scope.Student);

  if (error) return <AuthErrorPage authError={error} />;
  if (auth) return <AuthenticatedConfigInfo auth={auth} />;

  return <LoadingPage reason="正在確認是否登入⋯⋯" />;
}

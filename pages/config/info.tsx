import React, { useEffect, useState } from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import BaseInput from "../../components/BaseElements/BaseInput";
import BaseButton from "../../components/BaseElements/BaseButton";
import useAuth from "../../components/AuthStore/useAuth";
import { Scope } from "../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../utilities/useError";
import useRedirect from "../../utilities/useRedirect";
import ErrorPage from "../../components/Page/ErrorPage";

export default function CSCConfigInfoSetup() {
  const router = useRouter();
  const { auth, error: authError } = useAuth(true, Scope.Student);
  const { redirect } = useRedirect("/config");
  const [error, setError] = useError();
  const [userClass, setUserClass] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [hasInitiated, setHasInitiated] = useState(false);

  useEffect(() => {
    auth
      ?.userInfo()
      .then((userInfo) => {
        if (
          userInfo?.student &&
          !hasInitiated &&
          userClass === "" &&
          userNumber === ""
        ) {
          const { class: userOriginalClass, number: userOriginalNumber } =
            userInfo.student;

          setUserClass(userOriginalClass);
          setUserNumber(userOriginalNumber);
          setHasInitiated(true);
        }
      })
      .catch(() => {
        /* ignore it */
      });
  }, [auth, userClass, userNumber, hasInitiated]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError, setError]);

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <HeaderPageCard
      id="config-info-setup"
      title="設定班級座號"
      desc="重新設定您的班級和座號。"
      icon={faCog}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (auth) {
            const success = await auth.setIdentity(userClass, userNumber);

            if (!success) {
              setError({
                message:
                  "輸入內容有誤或是伺服器錯誤，以致無法更改班級或座號 ; (",
                details: `Class: ${encodeURIComponent(
                  userClass
                )}; Number: ${encodeURIComponent(userNumber)}`,
              });
            } else {
              await redirect();
            }
          } else {
            setError({
              message: "身份驗證失敗。試試看重新載入或重開瀏覽器？",
              details: `${auth}`,
            });
          }
        }}
      >
        <BaseInput
          id="class"
          label="班級"
          value={userClass}
          onChange={setUserClass}
          required
        />
        <BaseInput
          id="number"
          label="座號"
          value={userNumber}
          onChange={setUserNumber}
          required
        />
        <BaseButton solid submit className="mt-4">
          儲存
        </BaseButton>
        <BaseButton className="mt-4 ml-2" onClick={() => router.back()}>
          取消
        </BaseButton>
      </form>
    </HeaderPageCard>
  );
}

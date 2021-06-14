import React, { useState } from "react";
import BaseButton from "../components/BaseElements/BaseButton";

import { getClientIdList } from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import BasePageCard from "../components/Page/BasePageCard";

export default function Home() {
  const availableSchool = Object.keys(getClientIdList());
  const [school, setSchool] = useState("");
  const handler = () => undefined;

  return (
    <BasePageCard id="home" title="首頁">
      <div className="flex flex-col items-center justify-items-center">
        <div className="flex w-full px-4 py-10 text-white bg-black md:px-20 md:py-10 page-title">
          <div>
            <h1 className="pb-1 text-3xl font-bold">教師登入系統</h1>
            <p className="pb-4 text-xl">讓你對各個學生的出缺席情況暸若指掌。</p>
          </div>
        </div>

        <div className="w-full px-4 py-10 md:px-20 md:py-10 select-school-root">
          {school === "" ? (
            <div className="select-school">
              <h2 className="pb-1 text-2xl text-center md:text-left">
                選擇登入學校
              </h2>
              <div className="grid grid-cols-1 gap-3 justify-items-center md:justify-items-start md:grid-flow-col school-options">
                {availableSchool.map((org) => (
                  <div key={`available-school-option-${org}`}>
                    <BaseButton
                      className="transition-all duration-300 hover:bg-black hover:text-white"
                      type="button"
                      onClick={() => setSchool(org)}
                    >
                      {org}
                    </BaseButton>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <LoginComponent
                org={school}
                scope={Scope.Teacher}
                onLogin={handler}
                onLogout={handler}
                onFailure={handler}
                loginText={`${school}登入區`}
              />
            </div>
          )}
        </div>
      </div>
    </BasePageCard>
  );
}

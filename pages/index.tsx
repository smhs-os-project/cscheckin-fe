import React, { useState } from "react";
import BaseButton from "../components/BaseElements/BaseButton";

import { getClientIdList } from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent from "../components/GoogleLoginComponent/LoginComponent";
import BasePage from "../components/Page/BasePage";

export default function Home() {
  const availableSchool = Object.keys(getClientIdList());
  const [school, setSchool] = useState("");
  const handler = () => undefined;

  return (
    <BasePage id="home" title="首頁" full>
      <div className="page-title">
        <h1 className="text-3xl font-bold pb-1">登入系統</h1>
        <p className="text-xl pb-4">讓你對各個學生的出缺席情況暸若指掌。</p>
      </div>

      {school === "" ? (
        <div className="select-school">
          <h2 className="text-2xl pb-1">選擇學校</h2>
          <div className="school-options grid grid-cols-1 md:grid-cols-6 gap-3">
            {availableSchool.map((org) => (
              <div key={`available-school-option-${org}`}>
                <BaseButton
                  className="hover:bg-black hover:text-white duration-300 transition-all"
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
        <LoginComponent
          org={school}
          onLogin={handler}
          onLogout={handler}
          onFailure={handler}
          loginText={`${school}登入區`}
        />
      )}
    </BasePage>
  );
}

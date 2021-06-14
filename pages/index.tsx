import React, { useState } from "react";
import BaseButton from "../components/BaseElements/BaseButton";

import { getClientIdList } from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";

export default function Home() {
  const availableSchool = Object.keys(getClientIdList());
  const [school, setSchool] = useState("");
  const handler = () => undefined;

  return (
    <HeaderPageCard
      id="teacher-login-portal"
      title="教師登入系統"
      desc="讓你對各個學生的出缺席情況暸若指掌。"
    >
      {school === "" ? (
        <div className="select-school">
          <h2 className="pb-2 text-2xl text-center md:text-left">
            選擇登入學校
          </h2>
          <div className="grid w-full grid-cols-1 gap-1 justify-items-center md:justify-items-start md:grid-flow-col school-options">
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
    </HeaderPageCard>
  );
}

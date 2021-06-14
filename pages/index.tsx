import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { getClientIdList } from "../components/GoogleLoginComponent/getClientIdList";
import LoginComponent, {
  Scope,
} from "../components/GoogleLoginComponent/LoginComponent";
import HeaderPageCard from "../components/Page/HeaderPageCard";
import randBackgroundColor from "../utilities/randcolor";

export default function Home() {
  const availableSchool = Object.keys(getClientIdList());
  const [school, setSchool] = useState("");
  const handler = () => undefined;

  return (
    <HeaderPageCard
      id="teacher-login-portal"
      title="教師登入系統"
      desc="讓你對各個學生的出缺席情況暸若指掌。"
      contentPadding={false}
    >
      {school === "" ? (
        <section className="select-school">
          <div className="flex flex-col w-full school-options">
            {availableSchool.map((org) => (
              <div key={`available-school-option-${org}`}>
                <button
                  className={`w-full px-6 py-10 text-left text-black hover:text-white transition-all duration-300 rounded-none ${randBackgroundColor(
                    true
                  )}`}
                  type="button"
                  onClick={() => setSchool(org)}
                >
                  <div className="flex justify-between">
                    <div>{org}</div>
                    <div>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="flex content-center justify-center w-full p-10">
          <LoginComponent
            org={school}
            scope={Scope.Teacher}
            onLogin={handler}
            onLogout={handler}
            onFailure={handler}
            loginText={`${school}登入區`}
          />
        </section>
      )}
    </HeaderPageCard>
  );
}

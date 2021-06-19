import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faBug, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AuthUserResponse } from "cscheckin-js-sdk/dist/types";
import { randTextColor } from "../../utilities/randcolor";
import { useAuth } from "../AuthStore/utilities";

export default function SupportBtn() {
  const router = useRouter();
  const [auth] = useAuth(false);
  const [userData, setUserData] = useState<AuthUserResponse | null>(null);

  useEffect(() => {
    auth?.userInfo().then(setUserData);
  }, [auth]);

  return (
    <div style={{ marginRight: ".7rem" }}>
      <button type="button" className="rounded-full">
        <a href="https://cscin.tk/join" target="_blank" rel="noreferrer">
          <div className="flex items-center" style={{ marginRight: ".7rem" }}>
            <div className="hidden mr-4 opacity-75 hover:block">使用說明</div>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full">
        <a
          href={`https://cscin.tk/?action=feedback&name=${encodeURI(
            userData?.name ?? ""
          )}&email=${encodeURI(userData?.email ?? "")}&path=${encodeURI(
            router.asPath
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center">
            <div className="hidden mr-4 opacity-75 hover:block">問題回報</div>
            <FontAwesomeIcon
              icon={faBug}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>
    </div>
  );
}

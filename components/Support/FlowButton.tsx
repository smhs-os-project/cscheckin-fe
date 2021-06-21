import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  faBug,
  faHandHoldingUsd,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="mr-4 space-x-4">
      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          提供開發與維護資金
        </span>
        <a href="https://cscin.tk/sponsor" target="_blank" rel="noreferrer">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          使用說明
        </span>
        <a href="https://cscin.tk/join" target="_blank" rel="noreferrer">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          回報問題
        </span>
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

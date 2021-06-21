import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faBug, faHandHoldingUsd, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AuthUserResponse } from "cscheckin-js-sdk/dist/types";
import { randTextColor } from "../../utilities/randcolor";
import { useAuth } from "../AuthStore/utilities";
import Link from "next/link";

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
        <a href="https://cscin.tk/sponsor" target="_blank" rel="noreferrer">
          <div className="flex items-center" style={{ marginRight: ".7rem" }}>
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full">
        <a href="https://cscin.tk/join" target="_blank" rel="noreferrer">
          <div className="flex items-center" style={{ marginRight: ".7rem" }}>
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

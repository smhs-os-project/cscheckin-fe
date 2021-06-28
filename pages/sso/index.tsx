import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListChoicePageCard from "../../components/Page/ListChoicePageCard";

export default function CSCSSOLoginMenu() {
  const router = useRouter();

  return (
    <ListChoicePageCard
      id="csc-login-menu"
      title="登入選單"
      desc="以學生還是教師身份登入？"
      icon={faCog}
    >
      {[
        {
          id: "student",
          name: "學生身份",
          redirect: async () => {
            await router.push("/sso/student");
          },
        },
        {
          id: "teacher",
          name: "教師身份",
          redirect: async () => {
            await router.push("/sso/teacher");
          },
        },
      ]}
    </ListChoicePageCard>
  );
}

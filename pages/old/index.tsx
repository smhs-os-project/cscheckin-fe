import router from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../components/AuthStore/useAuth";
import HeaderPageCard from "../../components/Page/HeaderPageCard";

export default function Home() {
  // we write our own logic for redirecting
  const [auth, loading] = useAuth(false);

  useEffect(() => {
    if (auth) {
      void router.push("/admin");
    } else if (!auth && !loading) {
      void router.push(`/sso/login?redirect=${encodeURIComponent("/admin")}`);
    }
  });

  return (
    <HeaderPageCard
      id="home"
      title="前導跳轉系統"
      desc="正在判斷是否已經通過身分認證⋯⋯"
    >
      <p>
        如果沒有跳轉，請重新整理，或更換瀏覽器、裝置。若問題持續，請使用下方的「問題回報」回報問題。
      </p>
    </HeaderPageCard>
  );
}

import React, { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import NProgress from "nprogress";
import HeaderPageCard from "./HeaderPageCard";

const RefreshButton = dynamic(() => import("../Elements/Button/RefreshButton"));

export interface LoadingPageProps {
  reason: string;
}

export default function LoadingPage({ reason }: LoadingPageProps) {
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (!inProgress) {
      setInProgress(true);
      NProgress.start();
    }

    return function stopInProgress() {
      if (inProgress) {
        setInProgress(false);
        NProgress.done();
      }
    };
  }, [inProgress]);

  return (
    <HeaderPageCard
      title={reason}
      desc="很快就會完成。請稍候～"
      headerColor="bg-accent"
      icon={faSpinner}
    >
      <p>如超過 10 秒無反應，請點選下方按鈕重新整理。</p>
      <p>若問題持續，請按右下角「回報問題」告知我們。</p>
      <RefreshButton className="mt-4" />
    </HeaderPageCard>
  );
}

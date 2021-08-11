import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import * as Sentry from "@sentry/browser";
import HeaderPageCard from "../HeaderPageCard";
import LargeButton from "../../Elements/Button/LargeButton";
import LargeButtonGroup from "../../Elements/Button/Group/LargeButtonGroup";
import useAuth from "../../Database/AuthStore/useAuth";

const ErrorInfo = dynamic(() => import("./ErrorInfo"));
const ErrorHintText = dynamic(() => import("./ErrorPageHint"));
const RefreshButton = dynamic(
  () => import("../../Elements/Button/RefreshButton")
);

export interface ErrorPageProps {
  errorMessage: string;
  errorDetails?: string;
}

const NegativeRefreshButton = () => (
  <RefreshButton backgroundColor="bg-negative" solidBorderColor="bg-negative">
    再試一次
  </RefreshButton>
);

const NegativeErrorReportingButton = () => {
  const { auth } = useAuth();

  return (
    <LargeButton
      solid
      solidBorderColor="border-on-surface"
      backgroundColor="bg-on-surface"
      textColor="text-text-primary"
      onClick={async () => {
        const userInfo = await auth?.userInfo();

        Sentry.showReportDialog({
          user: {
            email: userInfo?.email,
            name: userInfo?.name,
          },
          title: "請告知我們問題相關資訊。",
          subtitle: "比如說你操作了什麼，或者是設定了什麼。",
          subtitle2: "我們會立刻處理。",
          labelName: "您的暱稱",
          labelEmail: "您的 email",
          labelComments: "問題描述（附圖請用 imgur）",
          labelClose: "關閉",
          labelSubmit: "回報",
        });
      }}
    >
      問題回報
    </LargeButton>
  );
};

export default function ErrorPage({
  errorMessage,
  errorDetails,
}: ErrorPageProps) {
  return (
    <HeaderPageCard
      title={errorMessage}
      desc="如有任何問題，歡迎詢問或回報給我們 ;w;"
      icon={faExclamationTriangle}
      headerColor="bg-negative"
    >
      <div className="error-info">
        <ErrorInfo occurredDate={new Date()} occurredDetails={errorDetails} />
      </div>
      <div className="error-hint mt-5">
        <ErrorHintText />
      </div>
      <div className="operation-buttons mt-5">
        <LargeButtonGroup>
          <NegativeRefreshButton />
          <NegativeErrorReportingButton />
        </LargeButtonGroup>
      </div>
    </HeaderPageCard>
  );
}

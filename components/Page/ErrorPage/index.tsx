import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { auth } = useAuth();

  return (
    <LargeButton
      solid
      solidBorderColor="border-on-surface"
      backgroundColor="bg-on-surface"
      textColor="text-text-primary"
      onClick={async () => {
        const userInfo = await auth?.userInfo();

        window.open(
          `https://cscin.tk/?action=feedback&name=${encodeURI(
            userInfo?.name ?? ""
          )}&email=${encodeURI(userInfo?.email ?? "")}&path=${encodeURI(
            router.asPath
          )}`,
          "_blank"
        );
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

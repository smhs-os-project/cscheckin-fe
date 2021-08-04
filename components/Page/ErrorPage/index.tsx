import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import HeaderPageCard from "../HeaderPageCard";
import LargeButton from "../../Elements/Button/LargeButton";

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
  <RefreshButton
    className="flex-1"
    backgroundColor="bg-negative"
    solidBorderColor="bg-negative"
  />
);

const NegativeErrorReportingButton = () => (
  <LargeButton
    className="flex-1"
    borderColor="border-negative"
    textColor="text-negative"
  >
    問題回報
  </LargeButton>
);

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
      <div className="operation-buttons mt-5 flex space-x-2 justify-between">
        <NegativeRefreshButton />
        <NegativeErrorReportingButton />
      </div>
    </HeaderPageCard>
  );
}

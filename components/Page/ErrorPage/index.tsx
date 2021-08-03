import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import HeaderPageCard from "../HeaderPageCard";
import BaseButtonGroup from "../../Elements/Button/Group/BaseButtonGroup";

const ErrorInfo = dynamic(() => import("./ErrorInfo"));
const ErrorHintText = dynamic(() => import("./ErrorPageHint"));
const RefreshButton = dynamic(
  () => import("../../Elements/Button/RefreshButton")
);

export interface ErrorPageProps {
  errorMessage: string;
  errorDetails?: string;
}

export default function ErrorPage({
  errorMessage,
  errorDetails,
}: ErrorPageProps) {
  return (
    <HeaderPageCard
      title={errorMessage}
      desc="如有任何問題，歡迎詢問或回報給我們 ;w;"
      icon={faExclamationTriangle}
      headerColor="red-600"
    >
      <div className="error-info">
        <ErrorInfo occurredDate={new Date()} occurredDetails={errorDetails} />
      </div>
      <div className="error-hint mt-1.5 pt-1.5 border-t-2">
        <ErrorHintText />
      </div>
      <div className="operation-buttons mt-3">
        <BaseButtonGroup>
          <RefreshButton className="bg-red-600">再試一次</RefreshButton>
        </BaseButtonGroup>
      </div>
    </HeaderPageCard>
  );
}

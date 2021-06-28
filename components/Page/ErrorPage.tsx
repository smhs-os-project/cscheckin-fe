import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../BaseElements/BaseButton";
import HeaderPageCard from "./HeaderPageCard";

export interface ErrorPageProps {
  errorMessage: string;
  errorDetails: string;
}

export default function ErrorPage({
  errorMessage,
  errorDetails,
}: ErrorPageProps) {
  return (
    <HeaderPageCard
      id="csc-error-page"
      title="系統壞掉了 QQ"
      desc="以下是問題的詳細內容，請告知我們！"
      icon={faExclamationTriangle}
      headerColor="red-800"
    >
      <div className="flex space-x-3">
        <div>錯誤訊息</div>
        <div className="max-h-48">{errorMessage}</div>
      </div>
      <div className="error-details flex space-x-3">
        <div>錯誤詳細資訊</div>
        <div className="max-h-48">{errorDetails}</div>
      </div>
      <div className="error-tip mt-3 font-medium">
        在問題修正之前，請先檢查您的瀏覽器是否關閉 Cookie
        功能、是否過於老舊或者是操作失誤。
        您可以戳戳下方的「再試一次」返回原頁面重新操作。
        若問題持續發生，請點「問題回報」。
      </div>
      <div className="operation-buttons mt-3">
        <BaseButton solid className="border-red-800">
          再試一次
        </BaseButton>
        <BaseButton className="bg-red-800">問題回報</BaseButton>
      </div>
    </HeaderPageCard>
  );
}

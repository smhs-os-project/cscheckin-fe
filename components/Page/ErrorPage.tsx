import React from "react";
import {
  faBug,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "../Elements/Button/BaseButton";
import HeaderPageCard from "./HeaderPageCard";

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
      id="csc-error-page"
      title={errorMessage}
      desc="如有任何問題，歡迎詢問或回報給我們 ;w;"
      icon={faExclamationTriangle}
      headerColor="red-600"
    >
      <div className="error-info">
        <table>
          <tbody>
            <tr>
              <th className="text-left pr-3">發生時間</th>
              <td className="max-h-48">{new Date().toLocaleString()}</td>
            </tr>
            {errorDetails && (
              <tr>
                <th className="text-left pr-3">詳細資訊</th>
                <td className="max-h-48">{errorDetails}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="error-tip mt-1.5 pt-1.5 font-medium max-w-3xl leading-relaxed border-t-2 ">
        會發生這個問題，可能是因為：
        <ul className="list-disc list-inside ml-4">
          <li>最上大字顯示的問題。</li>
          <li>
            您的瀏覽器關閉了 Cookie 功能
            <br />
            （瀏覽器通常將這個功能稱之為「『嚴格』反追蹤模式」）
          </li>
          <li>您的作業系統或瀏覽器太舊</li>
        </ul>
        您可以戳戳下方的「再試一次」返回原頁面重新操作。
        <br />
        若問題持續發生，請「截圖」之後， 點右下角的「問題回報{" "}
        <FontAwesomeIcon icon={faBug} />
        」。
      </div>
      <div className="operation-buttons mt-3 space-x-3">
        <BaseButton
          solid
          className="bg-red-600"
          onClick={() => {
            window.location.reload();
          }}
        >
          再試一次
        </BaseButton>
      </div>
    </HeaderPageCard>
  );
}

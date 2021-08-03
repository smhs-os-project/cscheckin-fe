import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPageHint() {
  return (
    <div className="font-medium max-w-3xl leading-relaxed">
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
  );
}

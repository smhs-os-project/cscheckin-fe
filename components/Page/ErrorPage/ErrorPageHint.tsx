import React from "react";

export default function ErrorPageHint() {
  return (
    <div className="font-medium max-w-3xl leading-relaxed">
      在問題修正前，請先檢查：
      <ul className="list-disc list-inside ml-4">
        <li>
          瀏覽器是否關閉 Cookie 功能
          <span className="text-auxiliary">
            （瀏覽器通常將這個功能稱之為「『嚴格』反追蹤模式」）
          </span>
        </li>
        <li>
          假如使用 LINE 或 Facebook 開啟，請確定
          <b>是否已經使用外部瀏覽器開啟</b>
        </li>
        <li>
          瀏覽器是否已經更新至最新版本
          <span className="text-auxiliary">
            （建議使用 Chrome、Edge、Firefox 或 Safari）
          </span>
        </li>
        <li>
          作業系統是否版本太舊
          <span className="text-auxiliary">
            （如 Windows XP、Mac OS X 10.6 等）
          </span>
        </li>
        <li>是否操作失誤</li>
      </ul>
      <p>您可以點擊下方的「再試一次」返回原頁面重新操作。</p>
      <p>若問題持續發生，請點擊「問題回報」。</p>
    </div>
  );
}

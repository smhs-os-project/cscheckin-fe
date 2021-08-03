import React from "react";

export interface ErrorInfoProps {
  occurredDate: Date;
  occurredDetails?: string;
}

export default function ErrorInfo({
  occurredDate,
  occurredDetails,
}: ErrorInfoProps) {
  return (
    <table>
      <tbody>
        <tr>
          <th className="text-left pr-3">發生時間</th>
          <td className="max-h-48">{occurredDate.toLocaleString()}</td>
        </tr>
        {occurredDetails && (
          <tr>
            <th className="text-left pr-3">詳細資訊</th>
            <td className="max-h-48">{occurredDetails}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

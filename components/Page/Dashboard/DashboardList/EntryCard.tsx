import React, { useMemo } from "react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";

export interface EntryCardStatusTextProps {
  status: CheckinState;
  checkedInAt?: Date;
}

export interface EntryCardLeftProps {
  status: CheckinState;
  userClass?: string;
  userNo?: string;
}

export interface EntryCardRightProps extends EntryCardStatusTextProps {
  userName?: string;
}

export type EntryCardProps = EntryCardLeftProps & EntryCardRightProps;

const statusBackgroundColorMap: Record<CheckinState, string> = {
  ON_TIME: "bg-accent",
  LATE: "bg-neutral",
  NOT_CHECKED_IN: "bg-negative",
};

function EntryCardLeft({ userClass, userNo, status }: EntryCardLeftProps) {
  const backgroundColor = statusBackgroundColorMap[status];

  return (
    <div
      className={`${backgroundColor} text-on-surface flex justify-center`}
      style={{
        gridArea: "status",
      }}
    >
      <div className="self-center text-center">
        <p className="text-details">
          {userClass && userClass.length ? userClass : "未設定"}
        </p>
        <p className="text-card-emphasize">
          {userNo && userNo.length ? userNo : "未設定"}
        </p>
      </div>
    </div>
  );
}

function EntryCardStatusText({
  status,
  checkedInAt,
}: EntryCardStatusTextProps) {
  const currentTime = useMemo(
    () => checkedInAt && checkedInAt.toLocaleTimeString("zh-TW"),
    [checkedInAt]
  );

  switch (status) {
    case CheckinState.ON_TIME:
      return <>{currentTime} 已簽到</>;
    case CheckinState.LATE:
      return <>{currentTime} 遲到</>;
    case CheckinState.NOT_CHECKED_IN:
      return <>未簽到</>;
    default:
      break;
  }

  return <>未知狀態</>;
}

function EntryCardRight({
  userName,
  status,
  checkedInAt,
}: EntryCardRightProps) {
  return (
    <div
      className="content px-4 py-4"
      style={{
        gridArea: "content",
      }}
    >
      <small className="text-details text-auxiliary">
        <EntryCardStatusText status={status} checkedInAt={checkedInAt} />
      </small>
      <pre className="text-card-emphasize font-header whitespace-pre-wrap">
        {userName && userName.length ? userName : "未設定"}
      </pre>
    </div>
  );
}

export default function EntryCard({
  checkedInAt,
  status,
  userClass,
  userName,
  userNo,
}: EntryCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow min-w-full min-h-min cursor-pointer">
      <div className="grid post-card-layout h-full">
        <EntryCardLeft status={status} userClass={userClass} userNo={userNo} />
        <EntryCardRight
          status={status}
          checkedInAt={checkedInAt}
          userName={userName}
        />
      </div>
      <style jsx>{`
        .post-card-layout {
          grid-template: "status content" 100% / 6em auto;
        }
      `}</style>
    </div>
  );
}

import React, { useMemo } from "react";
import type { EntriesStatProps } from "./EntriesStat";
import EntriesStat from "./EntriesStat";
import type { RefreshListButtonProps } from "./RefreshListButton";
import RefreshListButton from "./RefreshListButton";
import type { EntryCardProps } from "./EntryCard";
import EntryCard from "./EntryCard";

export type DashboardListHeaderProps = EntriesStatProps &
  RefreshListButtonProps;
export type DashboardListListProps = { studentsInfo: EntryCardProps[] };
export type DashboardListProps = DashboardListListProps &
  RefreshListButtonProps;

function DashboardListHeader({
  auth,
  classroomId,
  entries,
}: DashboardListHeaderProps) {
  return (
    <section className="flex justify-between items-center mb-6">
      <EntriesStat entries={entries} />
      <div>
        <RefreshListButton classroomId={classroomId} auth={auth} />
      </div>
    </section>
  );
}

function DashboardListList({ studentsInfo }: DashboardListListProps) {
  return (
    <section className="space-y-2">
      {studentsInfo.map(
        ({ checkedInAt, status, userClass, userName, userNo }) => (
          <EntryCard
            key={`dashboard-list-list-${userClass}-${userNo}-${userName}`}
            status={status}
            userClass={userClass}
            userNo={userNo}
            userName={userName}
            checkedInAt={checkedInAt}
          />
        )
      )}
    </section>
  );
}
export default function DashboardList({
  auth,
  classroomId,
  studentsInfo,
}: DashboardListProps) {
  const entriesStatEntries = useMemo(
    () =>
      studentsInfo.map((info) => ({
        state: info.status,
      })),
    [studentsInfo]
  );

  return (
    <section>
      <DashboardListHeader
        entries={entriesStatEntries}
        classroomId={classroomId}
        auth={auth}
      />
      <DashboardListList studentsInfo={studentsInfo} />
    </section>
  );
}

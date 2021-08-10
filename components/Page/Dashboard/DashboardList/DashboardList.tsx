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
    <section className="flex flex-col md:flex-row justify-center md:justify-between items-center md:mb-6">
      <div className="mb-6 md:mb-0">
        <EntriesStat entries={entries} />
      </div>
      <div className="mb-6 md:mb-0">
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

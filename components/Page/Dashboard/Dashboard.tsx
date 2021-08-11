import React from "react";
import type { DashboardCardProps } from "./DashboardCard/DashboardCard";
import DashboardCard from "./DashboardCard/DashboardCard";
import type { DashboardListProps } from "./DashboardList/DashboardList";
import DashboardList from "./DashboardList/DashboardList";

export type DashboardProps = DashboardCardProps & DashboardListProps;

export default function Dashboard({
  auth,
  courseId,
  classroomId,
  link,
  status,
  studentsInfo,
  onFullScreen,
}: DashboardProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <DashboardCard
          link={link}
          status={status}
          classroomId={classroomId}
          auth={auth}
          onFullScreen={onFullScreen}
          courseId={courseId}
        />
      </div>
      <div>
        <DashboardList
          studentsInfo={studentsInfo}
          courseId={courseId}
          auth={auth}
        />
      </div>
    </section>
  );
}

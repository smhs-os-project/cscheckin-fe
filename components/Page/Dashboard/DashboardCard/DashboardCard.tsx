import React from "react";
import LargeButtonGroup from "../../../Elements/Button/Group/LargeButtonGroup";
import type { StatusCardProps } from "./StatusCard";
import StatusCard from "./StatusCard";
import type { CourseLinkBlockProps } from "./CourseLinkBlock";
import CourseLinkBlock from "./CourseLinkBlock";
import type { ClassroomShareButtonProps } from "./ClassroomShareButton";
import ClassroomShareButton from "./ClassroomShareButton";
import CloseCourseButton from "./CloseCourseButton";
import CopyLinkButton from "./CopyLinkButton";

export interface DashboardCardProps
  extends CourseLinkBlockProps,
    StatusCardProps,
    ClassroomShareButtonProps {}

export default function DashboardCard({
  auth,
  cid,
  link,
  status,
  onFullScreen,
}: DashboardCardProps) {
  return (
    <section className="dashboard-card rounded-xl bg-secondary overflow-hidden">
      <StatusCard status={status} />
      <div className="flex flex-col space-y-4 m-8">
        <CourseLinkBlock link={link} onFullScreen={onFullScreen} />
        <LargeButtonGroup>
          <ClassroomShareButton cid={cid} auth={auth} />
          <CopyLinkButton link={link} />
        </LargeButtonGroup>
        <CloseCourseButton cid={cid} auth={auth} />
      </div>
    </section>
  );
}

import React from "react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import LargeButtonGroup from "../../../Elements/Button/Group/LargeButtonGroup";
import StatusCard, { StatusCardStatus } from "./StatusCard";
import CourseLinkBlock from "./CourseLinkBlock";
import ClassroomShareButton from "./ClassroomShareButton";
import CloseCourseButton from "./CloseCourseButton";
import CopyLinkButton from "./CopyLinkButton";

export interface DashboardCardProps {}

export default function DashboardCard(props: DashboardCardProps) {
  return (
    <section className="dashboard-card rounded-xl bg-secondary overflow-hidden">
      <StatusCard status={StatusCardStatus.OPEN} />
      <div className="flex flex-col space-y-4 m-8">
        <CourseLinkBlock link="hi" />
        <LargeButtonGroup>
          <ClassroomShareButton cid={123} auth={new CSCAuth("", "")} />
          <CopyLinkButton link="Hi" />
        </LargeButtonGroup>
        <CloseCourseButton cid={123} auth={new CSCAuth("", "")} />
      </div>
    </section>
  );
}

import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { DashboardCardProps } from "./DashboardCard";
import DashboardCard from "./DashboardCard";

export default {
  title: "Page/Dashboard/DashboardCard",
  component: DashboardCard,
} as Meta;

const Template: Story<DashboardCardProps> = ({
  auth,
  courseId,
  link,
  status,
  onFullScreen,
  classroomId,
}: DashboardCardProps) => (
  <DashboardCard
    auth={auth}
    courseId={courseId}
    status={status}
    link={link}
    onFullScreen={onFullScreen}
    classroomId={classroomId}
  />
);

export const DashboardCardExample = Template.bind({});
DashboardCardExample.args = {
  auth: new CSCAuth("", ""),
  courseId: 0,
  classroomId: "1337",
  link: "https://dstw.dev/1cc1f2",
  status: CheckinState.ON_TIME,
  onFullScreen: () => null,
};

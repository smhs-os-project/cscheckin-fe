import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import Dashboard from "./Dashboard";
import type { DashboardProps } from "./Dashboard";

export default {
  title: "Page/Dashboard",
  component: Dashboard,
} as Meta;

const Template: Story<DashboardProps> = ({
  auth,
  courseId,
  classroomId,
  link,
  onFullScreen,
  status,
  studentsInfo,
}: DashboardProps) => (
  <Dashboard
    auth={auth}
    studentsInfo={studentsInfo}
    courseId={courseId}
    classroomId={classroomId}
    status={status}
    link={link}
    onFullScreen={onFullScreen}
  />
);

export const DashboardExample = Template.bind({});
DashboardExample.args = {
  link: "https://dstw.dev/1cc1f2",
  status: CheckinState.ON_TIME,
  onFullScreen: () => null,
  auth: new CSCAuth("", ""),
  courseId: 0,
  classroomId: "1337",
  studentsInfo: [
    {
      status: CheckinState.ON_TIME,
      userClass: "201",
      userNo: "1",
      userName: "鄭佩樺",
      checkedInAt: new Date(Date.now() - 1000000),
    },
    {
      status: CheckinState.ON_TIME,
      userClass: "201",
      userNo: "2",
      userName: "陳慧筠",
      checkedInAt: new Date(Date.now() - 1200000),
    },
    {
      status: CheckinState.LATE,
      userClass: "201",
      userNo: "3",
      userName: "吳于珊",
      checkedInAt: new Date(Date.now()),
    },
    {
      status: CheckinState.NOT_CHECKED_IN,
      userClass: "201",
      userNo: "4",
      userName: "王晉禾",
    },
  ],
};

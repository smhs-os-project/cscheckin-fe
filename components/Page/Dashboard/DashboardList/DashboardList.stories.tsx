import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import DashboardList from "./DashboardList";
import type { DashboardListProps } from "./DashboardList";

export default {
  title: "Page/Dashboard/DashboardList",
  component: DashboardList,
} as Meta;

const Template: Story<DashboardListProps> = ({
  auth,
  classroomId,
  studentsInfo,
}: DashboardListProps) => (
  <DashboardList
    auth={auth}
    classroomId={classroomId}
    studentsInfo={studentsInfo}
  />
);

export const DashboardListExample = Template.bind({});
DashboardListExample.args = {
  auth: new CSCAuth("", ""),
  classroomId: 0,
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

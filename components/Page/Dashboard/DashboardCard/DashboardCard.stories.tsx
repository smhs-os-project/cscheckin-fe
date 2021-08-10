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
  cid,
  link,
  status,
  onFullScreen,
}: DashboardCardProps) => (
  <DashboardCard
    auth={auth}
    cid={cid}
    status={status}
    link={link}
    onFullScreen={onFullScreen}
  />
);

export const DashboardCardExample = Template.bind({});
DashboardCardExample.args = {
  auth: new CSCAuth("", ""),
  cid: 0,
  link: "https://cscin.tk/1cc1f2",
  status: CheckinState.ON_TIME,
  onFullScreen: () => null,
};

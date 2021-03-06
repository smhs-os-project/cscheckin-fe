import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import RefreshListButton from "./RefreshListButton";
import type { RefreshListButtonProps } from "./RefreshListButton";

export default {
  title: "Page/Dashboard/DashboardList/RefreshListButton",
  component: RefreshListButton,
} as Meta;

const Template: Story<RefreshListButtonProps> = ({
  auth,
  courseId,
}: RefreshListButtonProps) => (
  <RefreshListButton auth={auth} courseId={courseId} />
);

export const RefreshListButtonExample = Template.bind({});
RefreshListButtonExample.args = {
  auth: new CSCAuth("", ""),
  courseId: 1,
};

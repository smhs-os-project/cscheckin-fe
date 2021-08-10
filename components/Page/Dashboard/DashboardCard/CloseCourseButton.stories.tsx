import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import CloseCourseButton from "./CloseCourseButton";
import type { CloseCourseButtonProps } from "./CloseCourseButton";

export default {
  title: "Page/Dashboard/DashboardCard/CloseCourseButton",
  component: CloseCourseButton,
} as Meta;

const Template: Story<CloseCourseButtonProps> = ({
  auth,
  cid,
}: CloseCourseButtonProps) => <CloseCourseButton auth={auth} cid={cid} />;

export const CloseCourseButtonExample = Template.bind({});
CloseCourseButtonExample.args = {
  auth: new CSCAuth("", ""),
  cid: 0,
};

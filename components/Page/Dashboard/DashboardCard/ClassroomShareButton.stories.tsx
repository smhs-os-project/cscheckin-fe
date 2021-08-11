import React from "react";
import type { Meta, Story } from "@storybook/react";
import CSCAuth from "cscheckin-js-sdk/dist/auth";
import ClassroomShareButton from "./ClassroomShareButton";
import type { ClassroomShareButtonProps } from "./ClassroomShareButton";

export default {
  title: "Page/Dashboard/DashboardCard/ClassroomShareButton",
  component: ClassroomShareButton,
} as Meta;

const Template: Story<ClassroomShareButtonProps> = ({
  auth,
  courseId,
}: ClassroomShareButtonProps) => (
  <ClassroomShareButton auth={auth} courseId={courseId} />
);

export const ClassroomShareButtonExample = Template.bind({});
ClassroomShareButtonExample.args = {
  auth: new CSCAuth("", ""),
  courseId: 0,
};

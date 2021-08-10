import React from "react";
import type { Meta, Story } from "@storybook/react";
import CourseLinkBlock from "./CourseLinkBlock";
import type { CourseLinkBlockProps } from "./CourseLinkBlock";

export default {
  title: "Page/Dashboard/DashboardCard/CourseLinkBlock",
  component: CourseLinkBlock,
} as Meta;

const Template: Story<CourseLinkBlockProps> = ({
  link,
}: CourseLinkBlockProps) => (
  <div className="p-10 bg-secondary max-w-2xl">
    <CourseLinkBlock link={link} />
  </div>
);

export const CourseLinkBlockExample = Template.bind({});
CourseLinkBlockExample.args = {
  link: "Hello, World!",
};

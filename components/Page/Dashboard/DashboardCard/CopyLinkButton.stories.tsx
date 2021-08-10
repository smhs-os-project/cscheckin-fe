import React from "react";
import type { Meta, Story } from "@storybook/react";
import CopyLinkButton from "./CopyLinkButton";
import type { CopyLinkButtonProps } from "./CopyLinkButton";

export default {
  title: "Page/Dashboard/DashboardCard/CopyLinkButton",
  component: CopyLinkButton,
} as Meta;

const Template: Story<CopyLinkButtonProps> = ({
  link,
}: CopyLinkButtonProps) => <CopyLinkButton link={link} />;

export const CopyLinkButtonExample = Template.bind({});
CopyLinkButtonExample.args = {
  link: "Test",
};

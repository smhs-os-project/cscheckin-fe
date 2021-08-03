import React from "react";
import type { Meta, Story } from "@storybook/react";
import BasePageCard from "./BasePageCard";
import type { BasePageCardProps } from "./BasePageCard";

export default {
  title: "Page/BasePageCard",
  component: BasePageCard,
} as Meta;

const Template: Story<BasePageCardProps> = ({
  children,
  full,
  navbar,
  title,
}: BasePageCardProps) => (
  <BasePageCard title={title} full={full} navbar={navbar}>
    {children}
  </BasePageCard>
);

export const StandardExample = Template.bind({});
StandardExample.args = {
  title: "測試 BasePageCard",
  children: <p>hi!</p>,
};

export const WithNavbarDisabled = Template.bind({});
WithNavbarDisabled.args = {
  ...StandardExample.args,
  navbar: false,
};

export const WithFullWindow = Template.bind({});
WithFullWindow.args = {
  ...StandardExample.args,
  full: true,
};

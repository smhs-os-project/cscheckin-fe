import React from "react";
import type { Meta, Story } from "@storybook/react";
import DashboardCard from "./DashboardCard";
import type { DashboardCardProps } from "./DashboardCard";

export default {
  title: "Page/Dashboard/DashboardCard",
  component: DashboardCard,
} as Meta;

const Template: Story<DashboardCardProps> = (props: DashboardCardProps) => (
  <DashboardCard />
);

export const DashboardCardExample = Template.bind({});
DashboardCardExample.args = {};

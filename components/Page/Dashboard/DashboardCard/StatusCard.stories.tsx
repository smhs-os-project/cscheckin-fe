import React from "react";
import type { Meta, Story } from "@storybook/react";
import type { StatusCardProps } from "./StatusCard";
import StatusCard, { StatusCardStatus } from "./StatusCard";

export default {
  title: "Page/Dashboard/DashboardCard/StatusCard",
  component: StatusCard,
} as Meta;

const Template: Story<StatusCardProps> = ({ status }: StatusCardProps) => (
  <StatusCard status={status} />
);

export const OpenStatusCard = Template.bind({});
OpenStatusCard.args = {
  status: StatusCardStatus.OPEN,
};

export const LateStatusCard = Template.bind({});
LateStatusCard.args = {
  status: StatusCardStatus.LATE,
};

export const CloseStatusCard = Template.bind({});
CloseStatusCard.args = {
  status: StatusCardStatus.CLOSE,
};

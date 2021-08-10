import React from "react";
import type { Meta, Story } from "@storybook/react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { StatusCardProps } from "./StatusCard";
import StatusCard from "./StatusCard";

export default {
  title: "Page/Dashboard/DashboardCard/StatusCard",
  component: StatusCard,
} as Meta;

const Template: Story<StatusCardProps> = ({ status }: StatusCardProps) => (
  <StatusCard status={status} />
);

export const OpenStatusCard = Template.bind({});
OpenStatusCard.args = {
  status: CheckinState.ON_TIME,
};

export const LateStatusCard = Template.bind({});
LateStatusCard.args = {
  status: CheckinState.LATE,
};

export const CloseStatusCard = Template.bind({});
CloseStatusCard.args = {
  status: CheckinState.NOT_CHECKED_IN,
};

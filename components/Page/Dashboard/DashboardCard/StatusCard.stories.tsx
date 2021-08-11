import React from "react";
import type { Meta, Story } from "@storybook/react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { StatusCardProps } from "./StatusCard";
import StatusCard from "./StatusCard";

export default {
  title: "Page/Dashboard/DashboardCard/StatusCard",
  component: StatusCard,
} as Meta;

const Template: Story<StatusCardProps> = ({
  status,
  classroomId,
}: StatusCardProps) => <StatusCard status={status} classroomId={classroomId} />;

export const OpenStatusCard = Template.bind({});
OpenStatusCard.args = {
  status: CheckinState.ON_TIME,
  classroomId: "1337",
};

export const LateStatusCard = Template.bind({});
LateStatusCard.args = {
  status: CheckinState.LATE,
  classroomId: "1337",
};

export const CloseStatusCard = Template.bind({});
CloseStatusCard.args = {
  status: CheckinState.NOT_CHECKED_IN,
  classroomId: "1337",
};

export const HidRegenerateButtonCard = Template.bind({});
HidRegenerateButtonCard.args = {
  status: CheckinState.NOT_CHECKED_IN,
  classroomId: "",
};

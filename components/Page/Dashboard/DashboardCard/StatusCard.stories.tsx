import React from "react";
import type { Meta } from "@storybook/react";
import StatusCard, { StatusCardStatus } from "./StatusCard";

export default {
  title: "Page/Dashboard/DashboardCard/StatusCard",
  component: StatusCard,
} as Meta;

export const OpenStatusCardExample = () => (
  <StatusCard status={StatusCardStatus.OPEN} />
);

export const LateStatusCardExample = () => (
  <StatusCard status={StatusCardStatus.LATE} />
);

export const CloseStatusCardExample = () => (
  <StatusCard status={StatusCardStatus.CLOSE} />
);

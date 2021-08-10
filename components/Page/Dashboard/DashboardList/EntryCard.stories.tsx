import React from "react";
import type { Meta, Story } from "@storybook/react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { EntryCardProps } from "./EntryCard";
import EntryCard from "./EntryCard";

export default {
  title: "Page/Dashboard/DashboardList/EntryCard",
  component: EntryCard,
} as Meta;

const Template: Story<EntryCardProps> = ({
  checkedInAt,
  status,
  userClass,
  userName,
  userNo,
}: EntryCardProps) => (
  <EntryCard
    userName={userName}
    status={status}
    userClass={userClass}
    userNo={userNo}
    checkedInAt={checkedInAt}
  />
);

export const EntryCardExample = Template.bind({});
EntryCardExample.args = {
  userClass: "303",
  userNo: "1",
  userName: "張銓佑",
  checkedInAt: new Date(),
  status: CheckinState.ON_TIME,
};

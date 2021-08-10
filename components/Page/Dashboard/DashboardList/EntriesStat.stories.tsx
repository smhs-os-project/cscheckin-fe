import React from "react";
import type { Meta, Story } from "@storybook/react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import type { EntriesStatProps } from "./EntriesStat";
import EntriesStat from "./EntriesStat";

export default {
  title: "Page/Dashboard/DashboardList/EntriesStat",
  component: EntriesStat,
} as Meta;

const Template: Story<EntriesStatProps> = ({ entries }: EntriesStatProps) => (
  <EntriesStat entries={entries} />
);

export const EntriesStatExample = Template.bind({});
EntriesStatExample.args = {
  entries: [
    {
      state: CheckinState.ON_TIME,
    },
    {
      state: CheckinState.ON_TIME,
    },
    {
      state: CheckinState.ON_TIME,
    },
    {
      state: CheckinState.LATE,
    },
    {
      state: CheckinState.LATE,
    },
    {
      state: CheckinState.NOT_CHECKED_IN,
    },
  ],
};

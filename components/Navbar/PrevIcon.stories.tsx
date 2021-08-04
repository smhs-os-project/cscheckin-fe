import React from "react";
import type { Meta, Story } from "@storybook/react";
import PrevIcon from "./PrevIcon";
import type { PrevIconProps } from "./PrevIcon";

export default {
  title: "Navbar/PrevIcon",
  component: PrevIcon,
} as Meta;

const Template: Story<PrevIconProps> = ({ show }: PrevIconProps) => (
  <PrevIcon show={show} />
);

export const PrevIconExample = Template.bind({});
PrevIconExample.args = {
  show: true,
};

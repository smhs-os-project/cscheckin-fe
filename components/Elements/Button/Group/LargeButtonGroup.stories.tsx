import React from "react";
import type { Meta, Story } from "@storybook/react";
import LargeButton from "../LargeButton";
import LargeButtonGroup from "./LargeButtonGroup";
import type { LargeButtonGroupProps } from "./LargeButtonGroup";

export default {
  title: "Elements/Button/Group/LargeButtonGroup",
  component: LargeButtonGroup,
} as Meta;

const Template: Story<LargeButtonGroupProps> = ({
  children,
}: LargeButtonGroupProps) => <LargeButtonGroup>{children}</LargeButtonGroup>;

export const TwoLargeButtonsGroupExample = Template.bind({});
TwoLargeButtonsGroupExample.args = {
  children: (
    <>
      <LargeButton solid>Left</LargeButton>
      <LargeButton>Right</LargeButton>
    </>
  ),
};

export const ThreeLargeButtonsGroupExample = Template.bind({});
ThreeLargeButtonsGroupExample.args = {
  children: (
    <>
      <LargeButton solid>Left</LargeButton>
      <LargeButton>Center</LargeButton>
      <LargeButton>Right</LargeButton>
    </>
  ),
};

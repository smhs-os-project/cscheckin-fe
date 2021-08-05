import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { LargeButtonProps } from "./LargeButton";
import LargeButton from "./LargeButton";

export default {
  title: "Elements/Button/LargeButton",
  component: LargeButton,
} as Meta;

const Template: Story<LargeButtonProps> = ({
  children,
  solid,
  submit,
  full,
}: LargeButtonProps) => (
  <LargeButton solid={solid} submit={submit} full={full}>
    {children}
  </LargeButton>
);

export const LargeButtonExample = Template.bind({});
LargeButtonExample.args = {
  children: "Click me!",
};

export const LargeSolidButtonExample = Template.bind({});
LargeSolidButtonExample.args = {
  children: "Click me!",
  solid: true,
};

export const LargeSubmitButtonExample = Template.bind({});
LargeSubmitButtonExample.args = {
  children: "Click me!",
  submit: true,
};

export const LargeButtonWithFullWidth = Template.bind({});
LargeButtonWithFullWidth.args = {
  children: "Hi",
  full: true,
};

export const LargeButtonWithReactElements = Template.bind({});
LargeButtonWithReactElements.args = {
  children: (
    <>
      <span className="font-bold">AAA</span>
      <span>BBB</span>
    </>
  ),
  submit: true,
};

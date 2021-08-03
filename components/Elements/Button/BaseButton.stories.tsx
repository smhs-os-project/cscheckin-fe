import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { BaseButtonProps } from "./BaseButton";
import BaseButton from "./BaseButton";

export default {
  title: "Elements/Button/BaseButton",
  component: BaseButton,
} as Meta;

const Template: Story<BaseButtonProps> = ({
  children = <></>,
  solid,
  light,
  submit,
}: BaseButtonProps) => (
  <BaseButton solid={solid} submit={submit} light={light}>
    {children}
  </BaseButton>
);

export const BasicButton = Template.bind({});
BasicButton.args = {
  children: "Click me!",
};

export const BasicSolidButton = Template.bind({});
BasicSolidButton.args = {
  children: "Click me!",
  solid: true,
};

export const BasicSubmitButton = Template.bind({});
BasicSubmitButton.args = {
  children: "Click me!",
  submit: true,
};

export const BasicLightButton = Template.bind({});
BasicLightButton.args = {
  children: "Click me!",
  light: true,
};

export const BasicSolidLightButton = Template.bind({});
BasicSolidLightButton.args = {
  children: "Click me!",
  solid: true,
  light: true,
};

export const BasicButtonWithReactElements = Template.bind({});
BasicButtonWithReactElements.args = {
  children: (
    <>
      <span className="font-bold">AAA</span>
      <span>BBB</span>
    </>
  ),
  submit: true,
};

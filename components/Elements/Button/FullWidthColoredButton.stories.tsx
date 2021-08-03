import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { FullWidthColoredButtonProps } from "./FullWidthColoredButton";
import FullWidthColoredButton from "./FullWidthColoredButton";

export default {
  title: "Elements/Button/FullWidthColoredButton",
  component: FullWidthColoredButton,
} as Meta;

const Template: Story<FullWidthColoredButtonProps> = ({
  color,
  children,
}: FullWidthColoredButtonProps) => (
  <FullWidthColoredButton color={color} onClick={() => null}>
    {children}
  </FullWidthColoredButton>
);

export const RandomButton = Template.bind({});
RandomButton.args = {
  children: "Welcome!",
};

export const RedButton = Template.bind({});
RedButton.args = {
  children: "Welcome!",
  color: "red",
};

export const GreenButton = Template.bind({});
GreenButton.args = {
  children: "Welcome!",
  color: "green",
};

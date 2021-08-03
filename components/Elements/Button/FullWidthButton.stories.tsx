import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { FullWidthButtonProps } from "./FullWidthButton";
import FullWidthButton from "./FullWidthButton";

export default {
  title: "Elements/Button/FullWidthButton",
  component: FullWidthButton,
} as Meta;

const Template: Story<FullWidthButtonProps> = ({
  children,
  rightIcon,
}: FullWidthButtonProps) => (
  <div className="p-10 bg-primary">
    <FullWidthButton onClick={() => null} rightIcon={rightIcon}>
      {children}
    </FullWidthButton>
  </div>
);

export const FullWidthButtonExample = Template.bind({});
FullWidthButtonExample.args = {
  children: "Welcome!",
};

export const WithRightButton = Template.bind({});
WithRightButton.args = {
  children: "Welcome",
  rightIcon: true,
};

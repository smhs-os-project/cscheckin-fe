import React from "react";
import type { Meta, Story } from "@storybook/react";
import BaseButton from "../BaseButton";
import BaseButtonGroup from "./BaseButtonGroup";
import type { BaseButtonGroupProps } from "./BaseButtonGroup";

export default {
  title: "Elements/Button/Group/BaseButtonGroup",
  component: BaseButtonGroup,
} as Meta;

const Template: Story<BaseButtonGroupProps> = ({
  children,
}: BaseButtonGroupProps) => <BaseButtonGroup>{children}</BaseButtonGroup>;

export const BaseButtonGroupExample = Template.bind({});
BaseButtonGroupExample.args = {
  children: (
    <>
      <BaseButton>Button 1</BaseButton>
      <BaseButton>Button 2</BaseButton>
      <BaseButton>Button 3</BaseButton>
    </>
  ),
};

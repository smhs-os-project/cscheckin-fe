import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { BaseInputsProps } from "./BaseInput";
import BaseInput from "./BaseInput";

export default {
  title: "Elements/Input/BaseInput",
  component: BaseInput,
} as Meta;

const Template: Story<BaseInputsProps> = ({
  id,
  label,
  value,
}: BaseInputsProps) => <BaseInput id={id} label={label} value={value} />;

export const BasicLabelledInput = Template.bind({});
BasicLabelledInput.args = {
  id: "basic-label-input",
  label: "Username",
  value: "pan93412",
};

export const BasicUnlabelledInput = Template.bind({});
BasicUnlabelledInput.args = {
  id: "basic-unlabelled-input",
  value: "pan93412",
};

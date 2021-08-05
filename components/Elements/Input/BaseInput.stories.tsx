import type { Meta, Story } from "@storybook/react";
import React from "react";
import type { BaseInputsProps } from "./BaseInput";
import BaseInput from "./BaseInput";

export default {
  title: "Elements/Input/BaseInput",
  component: BaseInput,
} as Meta;

const Template: Story<BaseInputsProps> = ({
  label,
  value,
}: BaseInputsProps) => (
  <div className="p-10 bg-secondary">
    <BaseInput label={label} value={value} />
  </div>
);

export const BasicLabelledInput = Template.bind({});
BasicLabelledInput.args = {
  label: "班級",
};

export const BasicUnlabelledInput = Template.bind({});
BasicUnlabelledInput.args = {
  value: "15",
};

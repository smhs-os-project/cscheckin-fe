import React from "react";
import type { Meta, Story } from "@storybook/react";
import DurationInput from "./DurationInput";
import type { DurationInputProps } from "./DurationInput";

export default {
  title: "Elements/Input/DurationInput",
  component: DurationInput,
} as Meta;

const Template: Story<DurationInputProps> = ({
  onChange,
  value,
  prefix,
  suffix,
}: DurationInputProps) => (
  <div className="p-10 bg-secondary">
    <DurationInput
      value={value}
      onChange={onChange}
      prefix={prefix}
      suffix={suffix}
    />
  </div>
);

export const DurationInputExample = Template.bind({});
DurationInputExample.args = {};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  prefix: "再",
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: "後",
};

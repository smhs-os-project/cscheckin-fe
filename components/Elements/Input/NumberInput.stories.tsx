import React from "react";
import type { Meta, Story } from "@storybook/react";
import NumberInput from "./NumberInput";

export default {
  title: "Elements/Input/NumberInput",
  component: NumberInput,
} as Meta;

const Template: Story = () => <NumberInput />;

export const NumberInputExample = Template.bind({});
NumberInputExample.args = {};

import React from "react";
import type { Meta, Story } from "@storybook/react";
import BaseCard from "./BaseCard";
import type { BaseCardProps } from "./BaseCard";

export default {
  title: "Elements/Card/BaseCard",
  component: BaseCard,
} as Meta;

const Template: Story<BaseCardProps> = ({ children }: BaseCardProps) => (
  <BaseCard>{children}</BaseCard>
);

export const BaseCardExample = Template.bind({});
BaseCardExample.args = {
  children: "Hello World!",
};

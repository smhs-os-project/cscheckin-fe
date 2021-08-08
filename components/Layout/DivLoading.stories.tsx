import React from "react";
import type { Meta, Story } from "@storybook/react";
import DivLoading from "./DivLoading";
import type { DivLoadingProps } from "./DivLoading";

export default {
  title: "Layout/DivLoading",
  component: DivLoading,
} as Meta;

const Template: Story<DivLoadingProps> = ({ children }: DivLoadingProps) => (
  <DivLoading>{children}</DivLoading>
);

export const DivLoadingExample = Template.bind({});
DivLoadingExample.args = {
  children: "正在載入 DivLoading⋯⋯",
};

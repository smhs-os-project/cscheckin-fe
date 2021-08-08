import React from "react";
import type { Meta, Story } from "@storybook/react";
import DivItemsCenter from "./DivItemsCenter";
import type { DivItemsCenterProps } from "./DivItemsCenter";

export default {
  title: "Layout/DivItemsCenter",
  component: DivItemsCenter,
} as Meta;

const Template: Story<DivItemsCenterProps> = ({
  children,
}: DivItemsCenterProps) => <DivItemsCenter>{children}</DivItemsCenter>;

export const DivItemsCenterExample = Template.bind({});
DivItemsCenterExample.args = {
  children: <p>嗨！</p>,
};

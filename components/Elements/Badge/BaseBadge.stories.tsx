import React from "react";
import type { Meta, Story } from "@storybook/react";
import BaseBadge from "./BaseBadge";
import type { BaseBadgeProps } from "./BaseBadge";

export default {
  title: "Elements/Badge/BaseBadge",
  component: BaseBadge,
} as Meta;

const Template: Story<BaseBadgeProps> = ({
  backgroundClass,
  children,
  fontClass,
  paddingClass,
  roundClass,
  widthClass,
  style,
}: BaseBadgeProps) => (
  <BaseBadge
    fontClass={fontClass}
    paddingClass={paddingClass}
    style={style}
    backgroundClass={backgroundClass}
    roundClass={roundClass}
    widthClass={widthClass}
  >
    {children}
  </BaseBadge>
);

export const BaseBadgeExample = Template.bind({});
BaseBadgeExample.args = {
  children: "v1.0",
};

export const BlueBadgeExample = Template.bind({});
BlueBadgeExample.args = {
  children: "已簽到",
  backgroundClass: "bg-accent",
};

export const RedBadgeExample = Template.bind({});
RedBadgeExample.args = {
  children: "未簽到",
  backgroundClass: "bg-negative",
};

export const YellowBadgeExample = Template.bind({});
YellowBadgeExample.args = {
  children: "遲到",
  backgroundClass: "bg-neutral",
};

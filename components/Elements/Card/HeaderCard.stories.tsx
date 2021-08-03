import React from "react";
import type { Meta, Story } from "@storybook/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import HeaderCard from "./HeaderCard";
import type { HeaderCardProps } from "./HeaderCard";

export default {
  title: "Elements/Card/HeaderCard",
  component: HeaderCard,
  argTypes: {
    headerColor: {
      options: [
        "bg-primary",
        "bg-accent",
        "bg-positive",
        "bg-neutral",
        "bg-negative",
      ],
      control: "select",
    },
  },
} as Meta;

const Template: Story<HeaderCardProps> = ({
  children,
  contentPadding,
  desc,
  headerColor,
  icon,
  title,
}: HeaderCardProps) => (
  <HeaderCard
    title={title}
    headerColor={headerColor}
    desc={desc}
    icon={icon}
    contentPadding={contentPadding}
  >
    {children}
  </HeaderCard>
);

export const StandardExample = Template.bind({});
StandardExample.args = {
  title: "Hello, World!",
  desc: "This is a test card.",
  children: <p>Hi!</p>,
};

export const WithoutContentPadding = Template.bind({});
WithoutContentPadding.args = {
  ...StandardExample.args,
  contentPadding: false,
};

export const WithColoredHeader = Template.bind({});
WithColoredHeader.args = {
  ...StandardExample.args,
  headerColor: "bg-accent",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...StandardExample.args,
  icon: faHeart,
};

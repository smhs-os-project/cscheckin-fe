import React from "react";
import type { Meta, Story } from "@storybook/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "./HeaderPageCard";
import type { HeaderPageCardProps } from "./HeaderPageCard";

export default {
  title: "Page/HeaderPageCard",
  component: HeaderPageCard,
  argTypes: {
    headerColor: {
      options: [
        "red-500", // bg-red-500
        "blue-500", // bg-blue-500
        "yellow-500", // bg-yellow-500
        "green-500", // bg-green-500
        "pink-500", // bg-pink-500
        "red-800", // bg-red-800
        "blue-800", // bg-blue-800
        "yellow-800", // bg-yellow-800
        "green-800", // bg-green-800
        "pink-800", // bg-pink-800
      ],
      control: "select",
    },
  },
} as Meta;

const Template: Story<HeaderPageCardProps> = ({
  children,
  contentPadding,
  desc,
  full,
  headerColor,
  icon,
  navbar,
  title,
}: HeaderPageCardProps) => (
  <HeaderPageCard
    title={title}
    desc={desc}
    icon={icon}
    headerColor={headerColor}
    navbar={navbar}
    full={full}
    contentPadding={contentPadding}
  >
    {children}
  </HeaderPageCard>
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
  headerColor: "green-500",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...StandardExample.args,
  icon: faHeart,
};

export const WithNavbarDisabled = Template.bind({});
WithNavbarDisabled.args = {
  ...StandardExample.args,
  navbar: false,
};

export const WithFullWindow = Template.bind({});
WithFullWindow.args = {
  ...StandardExample.args,
  full: true,
};

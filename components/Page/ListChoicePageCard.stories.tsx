import React from "react";
import type { Meta, Story } from "@storybook/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ListChoicePageCard from "./ListChoicePageCard";
import type { ListChoicePageCardProps } from "./ListChoicePageCard";

export default {
  title: "Page/ListChoicePageCard",
  component: ListChoicePageCard,
} as Meta;

const Template: Story<ListChoicePageCardProps> = ({
  choice,
  contentPadding,
  desc,
  full,
  headerColor,
  icon,
  navbar,
  title,
  message,
}: ListChoicePageCardProps) => (
  <ListChoicePageCard
    title={title}
    desc={desc}
    icon={icon}
    headerColor={headerColor}
    navbar={navbar}
    full={full}
    contentPadding={contentPadding}
    message={message}
    choice={choice}
  />
);

export const StandardExample = Template.bind({});
StandardExample.args = {
  title: "Hello, World!",
  desc: "This is a test card page with choices.",
  choice: [
    {
      id: "option-1",
      name: "Option 1",
      redirect: () => null,
    },
    {
      id: "option-2",
      name: "Option 2",
      redirect: () => null,
    },
    {
      id: "option-3",
      name: "Option 3",
      redirect: () => null,
    },
  ],
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

export const WithMessage = Template.bind({});
WithMessage.args = {
  ...StandardExample.args,
  message: "Hello, world!",
};

import React from "react";
import type { Meta, Story } from "@storybook/react";
import type { NavbarContentProps } from "./NavbarContent";
import NavbarContent, { NavbarContentVariant } from "./NavbarContent";

export default {
  title: "Navbar/NavbarContent",
  component: NavbarContent,
} as Meta;

const Template: Story<NavbarContentProps> = ({
  variant,
}: NavbarContentProps) => <NavbarContent variant={variant} />;

export const HomepageVariant = Template.bind({});
HomepageVariant.args = {
  variant: NavbarContentVariant.HOMEPAGE,
};

export const NotLoggedInVariant = Template.bind({});
NotLoggedInVariant.args = {
  variant: NavbarContentVariant.NOT_LOGGED_IN,
};

export const LoggedInVariant = Template.bind({});
LoggedInVariant.args = {
  variant: NavbarContentVariant.LOGGED_IN,
};

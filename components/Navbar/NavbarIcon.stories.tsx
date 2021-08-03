import React from "react";
import type { Meta, Story } from "@storybook/react";
import NavbarIcon from "./NavbarIcon";

export default {
  title: "Navbar/NavbarIcon",
  component: NavbarIcon,
} as Meta;

const Template: Story = () => <NavbarIcon />;

export const NavbarIconExample = Template.bind({});

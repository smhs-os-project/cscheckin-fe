import React from "react";
import type { Meta, Story } from "@storybook/react";
import NavbarContent from "./NavbarContent";

export default {
  title: "Navbar/NavbarContent",
  component: NavbarContent,
} as Meta;

const Template: Story = () => <NavbarContent />;

export const NavbarContentExample = Template.bind({});

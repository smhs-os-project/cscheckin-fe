import React from "react";
import type { Meta, Story } from "@storybook/react";
import Navbar from "./Navbar";

export default {
  title: "Navbar/Navbar",
  component: Navbar,
} as Meta;

const Template: Story = () => <Navbar />;

export const NavbarExample = Template.bind({});
NavbarExample.args = {};

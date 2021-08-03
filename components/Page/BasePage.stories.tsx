import React from "react";
import type { Meta, Story } from "@storybook/react";
import type { BasePageProps } from "./BasePage";
import BasePage from "./BasePage";

export default {
  title: "Page/BasePage",
  component: BasePage,
} as Meta;

const Template: Story<BasePageProps> = ({
  title,
  full,
  navbar,
  children = <p>Hello</p>,
}: BasePageProps) => (
  <BasePage title={title} full={full} navbar={navbar}>
    {children}
  </BasePage>
);

export const BasePageExample = Template.bind({});
BasePageExample.args = {
  title: "Base Page Example",
};

export const BasePageExampleWithoutNavbar = Template.bind({});
BasePageExampleWithoutNavbar.args = {
  title: "Base Page Example (without Navbar)",
  navbar: false,
};

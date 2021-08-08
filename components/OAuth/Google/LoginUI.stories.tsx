import React from "react";
import type { Meta, Story } from "@storybook/react";
import type { LoginUIProps } from "./LoginUI";
import LoginUI from "./LoginUI";
import { Scope } from "./scope";

export default {
  title: "OAuth/Google/LoginUI",
  component: LoginUI,
} as Meta;

const Template: Story<LoginUIProps> = ({ scope }: LoginUIProps) => (
  <LoginUI scope={scope} />
);

export const LoginUIExample = Template.bind({});
LoginUIExample.args = {
  scope: Scope.Student,
};

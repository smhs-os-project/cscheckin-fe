import React from "react";
import type { Meta, Story } from "@storybook/react";
import type { GoogleLoginComponentProps } from "./GoogleLoginComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { Scope } from "./scope";

export default {
  title: "OAuth/Google/GoogleLoginComponent",
  component: GoogleLoginComponent,
} as Meta;

const Template: Story<GoogleLoginComponentProps> = ({
  scope,
}: GoogleLoginComponentProps) => (
  <GoogleLoginComponent
    scope={scope}
    onLogin={() => null}
    onError={() => null}
  />
);

export const StudentGoogleLoginComponentExample = Template.bind({});
StudentGoogleLoginComponentExample.args = {
  scope: Scope.Student,
};

export const TeacherGoogleLoginComponentExample = Template.bind({});
TeacherGoogleLoginComponentExample.args = {
  scope: Scope.Teacher,
};

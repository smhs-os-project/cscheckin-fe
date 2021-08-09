import React from "react";
import type { Meta, Story } from "@storybook/react";
import LoadingPage from "./LoadingPage";
import type { LoadingPageProps } from "./LoadingPage";

export default {
  title: "Page/LoadingPage",
  component: LoadingPage,
} as Meta;

const Template: Story<LoadingPageProps> = ({ reason }: LoadingPageProps) => (
  <LoadingPage reason={reason} />
);

export const LoadingPageExample = Template.bind({});
LoadingPageExample.args = {
  reason: "正在載入頁面⋯⋯",
};

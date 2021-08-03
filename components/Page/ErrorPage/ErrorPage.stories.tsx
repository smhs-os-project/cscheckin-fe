import React from "react";
import type { Meta, Story } from "@storybook/react";
import ErrorPage from ".";
import type { ErrorPageProps } from ".";

export default {
  title: "Page/ErrorPage",
  component: ErrorPage,
} as Meta;

const Template: Story<ErrorPageProps> = ({
  errorDetails,
  errorMessage,
}: ErrorPageProps) => (
  <ErrorPage errorMessage={errorMessage} errorDetails={errorDetails} />
);

export const WithDetails = Template.bind({});
WithDetails.args = {
  errorMessage: "測試錯誤",
  errorDetails: "測試錯誤詳細資訊",
};

export const WithoutDetails = Template.bind({});
WithoutDetails.args = {
  errorMessage: "測試錯誤",
};

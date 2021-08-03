import type { Meta } from "@storybook/react";
import React from "react";
import type { RefreshButtonProps } from "./RefreshButton";
import RefreshButton from "./RefreshButton";

export default {
  title: "Elements/Button/RefreshButton",
  component: RefreshButton,
} as Meta;

export const RefreshButtonExample = ({
  className,
  children,
}: RefreshButtonProps) => (
  <RefreshButton className={className}>{children}</RefreshButton>
);

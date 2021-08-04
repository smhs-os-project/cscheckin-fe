import React from "react";
import type { BaseButtonProps } from "./BaseButton";
import BaseButton from "./BaseButton";

export type LargeButtonProps = BaseButtonProps;

export default function LargeButton({
  paddingClass = "px-12 py-6",
  children,
  ...props
}: LargeButtonProps) {
  return (
    // that is too much to specify explicitly!
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseButton paddingClass={paddingClass} {...props}>
      {children}
    </BaseButton>
  );
}

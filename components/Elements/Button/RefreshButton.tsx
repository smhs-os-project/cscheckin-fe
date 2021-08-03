import type { ReactNode } from "react";
import React from "react";
import BaseButton from "./BaseButton";

export interface RefreshButtonProps {
  className?: string;
  children?: ReactNode;
}
export default function RefreshButton({
  className = "",
  children = "重新整理",
}: RefreshButtonProps) {
  return (
    <BaseButton
      className={className}
      solid
      onClick={() => {
        window.location.reload();
      }}
    >
      {children}
    </BaseButton>
  );
}

RefreshButton.defaultProps = {
  className: "",
};

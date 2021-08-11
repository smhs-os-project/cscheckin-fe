import type { ReactNode } from "react";
import React from "react";
import DivItemsCenter from "../../Layout/DivItemsCenter";

export interface BaseBadgeProps {
  paddingClass?: string;
  fontClass?: string;
  roundClass?: string;
  backgroundClass?: string;
  widthClass?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export default function BaseBadge({
  paddingClass = "py-0.5 px-3",
  fontClass = "font-button text-text-override",
  roundClass = "rounded-2xl",
  backgroundClass = "bg-primary",
  widthClass = "max-w-max",
  style,
  children,
}: BaseBadgeProps) {
  return (
    <div
      className={`${backgroundClass} ${roundClass} ${fontClass} ${paddingClass} ${widthClass}`}
      style={style}
    >
      <DivItemsCenter>{children}</DivItemsCenter>
    </div>
  );
}

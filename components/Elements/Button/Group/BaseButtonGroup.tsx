import type { ReactNode } from "react";
import React from "react";

export interface BaseButtonGroupProps {
  children: ReactNode;
}

export default function BaseButtonGroup({ children }: BaseButtonGroupProps) {
  return <div className="space-x-4">{children}</div>;
}

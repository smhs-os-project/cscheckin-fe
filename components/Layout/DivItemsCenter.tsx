import type { ReactNode } from "react";
import React from "react";

export interface DivItemsCenterProps {
  children: ReactNode;
}

export default function DivItemsCenter({ children }: DivItemsCenterProps) {
  return <div className="flex items-center space-x-4">{children}</div>;
}

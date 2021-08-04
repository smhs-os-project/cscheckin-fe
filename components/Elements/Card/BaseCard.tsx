import type { ReactNode } from "react";
import React from "react";

export interface BaseCardProps {
  children: ReactNode;
}

export default function BaseCard({ children }: BaseCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-secondary shadow-lg main-content md:max-w-xl">
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import React from "react";

export interface BaseCardProps {
  children: ReactNode;
}

export default function BaseCard({ children }: BaseCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-secondary shadow-lg main-content md:min-w-2xl max-w-2xl">
      {children}
    </div>
  );
}

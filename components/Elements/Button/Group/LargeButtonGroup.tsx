import type { ReactNode } from "react";
import React from "react";

export interface LargeButtonGroupProps {
  children: ReactNode;
}

export default function LargeButtonGroup({ children }: LargeButtonGroupProps) {
  const flex = "flex justify-between flex-col sm:flex-row";
  const spacing = "space-y-4 sm:space-y-0 sm:space-x-4";

  return (
    <>
      <div className={`large-btn-group ${flex} ${spacing}`}>{children}</div>
      <style jsx scoped>{`
        .large-btn-group > button {
          flex: 1;
        }
      `}</style>
    </>
  );
}

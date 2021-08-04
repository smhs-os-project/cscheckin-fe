import type { ReactNode } from "react";
import React from "react";

export interface LargeButtonGroupProps {
  children: ReactNode;
}

export default function LargeButtonGroup({ children }: LargeButtonGroupProps) {
  const flex = "flex justify-between flex-col md:flex-row";
  const spacing = "space-y-2 md:space-y-0 md:space-x-2";

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

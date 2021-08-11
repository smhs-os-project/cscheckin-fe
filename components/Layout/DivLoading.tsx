import type { ReactNode } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import DivItemsCenter from "./DivItemsCenter";

export interface DivLoadingProps {
  children: ReactNode;
}

export default function DivLoading({ children }: DivLoadingProps) {
  return (
    <DivItemsCenter>
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
      <div className="text-text-secondary">{children}</div>
    </DivItemsCenter>
  );
}

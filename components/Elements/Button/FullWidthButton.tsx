import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";
import React from "react";

export interface FullWidthButtonProps {
  onClick: () => void;
  children: ReactNode;
  rightIcon?: boolean;
}

export default function FullWidthButton({
  onClick,
  children,
  rightIcon = false,
}: FullWidthButtonProps) {
  return (
    <button
      className="bg-white w-full px-6 py-8 text-left outline-none text-primary transition-color duration-300 rounded-xl tracking-button font-button"
      type="button"
      onClick={onClick}
    >
      <div className="flex justify-between items-center font-fw-button">
        <div className="text-bold">{children}</div>
        {rightIcon && (
          <div>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        )}
      </div>
    </button>
  );
}

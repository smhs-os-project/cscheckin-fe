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
  const common =
    "px-6 py-8 rounded-xl w-full outline-none transition-color duration-300";
  const text = "text-primary bg-white hover:bg-secondary-hover";
  const font = "tracking-button font-button text-left";

  return (
    <button
      className={`${common} ${text} ${font}`}
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

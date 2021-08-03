import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";
import React from "react";
import type { TSupportedColorList } from "../../../utilities/Random/randcolor";
import {
  backgroundColorConfiguration,
  randColor,
} from "../../../utilities/Random/randcolor";

export interface FullWidthColoredButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: TSupportedColorList;
}

export default function FullWidthColoredButton({
  onClick,
  children,
  color = randColor(),
}: FullWidthColoredButtonProps) {
  return (
    <button
      className={`w-full px-6 py-10 text-left outline-none text-black hover:text-white transition-all duration-300 rounded-none ${backgroundColorConfiguration(
        color,
        true
      )}`}
      type="button"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="text-bold">{children}</div>
        <div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </button>
  );
}

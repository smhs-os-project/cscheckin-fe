import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
}

export default function BaseButton(props: BaseButtonProps) {
  const { className, children, solid } = props;
  const solidC = "text-white bg-black";
  const borderC = "border border-black";

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type="button"
      className={`rounded px-6 py-1 ${solid ? solidC : borderC} w-full h-12 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}

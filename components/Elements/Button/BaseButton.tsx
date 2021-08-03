import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
  submit?: boolean;
  light?: boolean;
}

export default function BaseButton({
  className,
  children,
  solid = false,
  submit = false,
  light = false,
  ...props
}: BaseButtonProps) {
  const solidC = light ? "text-black bg-white" : "text-white bg-black";
  const borderC = light
    ? "border border-white text-white"
    : "border border-black text-black";

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={submit ? "submit" : "button"}
      className={`rounded px-4 py-1 ${solid ? solidC : borderC} min-h-10 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}

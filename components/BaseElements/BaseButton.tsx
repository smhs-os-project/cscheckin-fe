import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
  submit?: boolean;
}

export default function BaseButton({
  className,
  children,
  solid = false,
  submit = false,
  ...props
}: BaseButtonProps) {
  const solidC = "text-white bg-black";
  const borderC = "border border-black";

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

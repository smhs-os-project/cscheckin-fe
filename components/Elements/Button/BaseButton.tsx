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
  const solidC = "px-5 py-2 text-secondary bg-accent font-solid-button";
  const borderC = "px-4 py-1 border-2 border-button text-primary";

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={submit ? "submit" : "button"}
      className={`rounded-lg tracking-button ${
        solid ? solidC : borderC
      } min-h-10 ${className || ""}`}
    >
      {children}
    </button>
  );
}

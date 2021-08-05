import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
  submit?: boolean;
  /**
   * 按鈕邊框顏色。
   *
   * 惟當 `solid == false` 時生效。
   */
  borderColor?: string;
  /**
   * solid 按鈕的邊框顏色。
   *
   * 通常與 <按鈕背景色> 相同。
   *
   * 惟當 `solid == true` 時生效。
   */
  solidBorderColor?: string;
  /**
   * 按鈕文字色。
   */
  textColor?: string;
  /**
   * 按鈕背景色。
   *
   * 惟當 `solid == true` 時生效。
   */
  backgroundColor?: string;
  /**
   * 專用於指定內邊距的 class。
   */
  paddingClass?: string;
  /**
   * 專用於指定邊框的 class。
   */
  borderClass?: string;
  /**
   * 是否全寬？
   */
  full?: boolean;
}

export default function BaseButton({
  className,
  children,
  solid = false,
  submit = false,
  borderColor = "border-button",
  solidBorderColor = "border-accent",
  textColor: inputTextColor,
  backgroundColor = "bg-accent",
  paddingClass = "px-6 py-2",
  borderClass = "border-2",
  full = false,
  ...props
}: BaseButtonProps) {
  // If not specified inputTextColor, we assign the textColor to text-secondary
  // if this is a solid button; otherwise, we assign to text-primary.
  const textColor =
    inputTextColor || (solid ? "text-secondary" : "text-primary");
  const solidC = `${solidBorderColor} ${textColor} ${backgroundColor}`;
  const borderC = `${borderColor} ${textColor}`;
  const fullC = full ? "w-full" : "";

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={submit ? "submit" : "button"}
      className={`${paddingClass} ${borderClass} rounded-lg font-button tracking-button ${
        solid ? solidC : borderC
      } min-h-10 ${fullC} ${className || ""}`}
    >
      {children}
    </button>
  );
}

import type { ReactNode, ButtonHTMLAttributes } from "react";
import React from "react";
import LargeButton from "./LargeButton";

/**
 * @see BaseButtonProps
 */
export interface RefreshButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
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
}
export default function RefreshButton({
  className = "",
  children = "重新整理",
  ...props
}: RefreshButtonProps) {
  return (
    <LargeButton
      className={className}
      solid
      onClick={() => {
        window.location.reload();
      }}
      // too much to define them all explicitly
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </LargeButton>
  );
}

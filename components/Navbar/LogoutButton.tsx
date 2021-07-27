import React from "react";
import BaseButton from "../Elements/Button/BaseButton";
import Logout from "../AuthStore/logout";

export interface LogoutButtonProps {
  show: boolean;
}

export default function LogoutButton({ show }: LogoutButtonProps) {
  if (show)
    return (
      <BaseButton
        solid
        className="hover:bg-red-600 transition-colors"
        onClick={Logout}
      >
        登出
      </BaseButton>
    );

  return null;
}

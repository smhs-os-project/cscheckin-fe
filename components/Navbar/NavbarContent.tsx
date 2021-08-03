import React from "react";
import BaseButton from "../Elements/Button/BaseButton";

// export interface NavbarContentProps {}

export default function NavbarContent() {
  return (
    <div className="flex items-center">
      <BaseButton solid>登入來建立簽到連結</BaseButton>
    </div>
  );
}

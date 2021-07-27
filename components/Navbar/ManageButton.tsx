import Link from "next/link";
import React from "react";
import BaseButton from "../Elements/Button/BaseButton";

export default function ManageButton() {
  return (
    <Link href="/checkin/manage">
      <BaseButton solid>
        <span className="hidden md:inline">簽到連結</span>管理
      </BaseButton>
    </Link>
  );
}

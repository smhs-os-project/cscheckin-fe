import Link from "next/link";
import React from "react";
import BaseButton from "../Elements/Button/BaseButton";

export default function SettingsButton() {
  return (
    <Link href="/config">
      <BaseButton>設定</BaseButton>
    </Link>
  );
}

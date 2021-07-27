import React from "react";
import Link from "next/link";
import LogoElement from "./Logo";

export default function LogoButton() {
  return (
    <button type="button" className="focus:outline-none">
      <Link href="/">
        <LogoElement />
      </Link>
    </button>
  );
}

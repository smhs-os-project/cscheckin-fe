import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "../../public/icon.svg";

export default function NavbarIcon() {
  return (
    <Link href="/welcome">
      <button
        type="button"
        className="flex font-header items-center space-x-3 text-h2 p-3"
      >
        <Image src={icon as StaticImageData} width="36em" height="36em" />
        <div>CSCheckin</div>
      </button>
    </Link>
  );
}

import React from "react";
import Image from "next/image";
import icon from "../../public/icon.svg";

export default function NavbarIcon() {
  return (
    <div className="flex font-header items-center space-x-3 text-h2">
      <Image src={icon as StaticImageData} width="36em" height="36em" />
      <div>CSCheckin</div>
    </div>
  );
}

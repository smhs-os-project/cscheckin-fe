import React from "react";
import Image from "next/image";
import icon from "../../public/icon.svg";

export default function NavbarIcon() {
  return <Image src={icon as StaticImageData} width="36em" height="36em" />;
}

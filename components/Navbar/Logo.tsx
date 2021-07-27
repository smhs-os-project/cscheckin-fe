import React from "react";
import Image from "next/image";

export default function LogoElement() {
  return (
    <div className="flex content-center items-center">
      <div className="w-max h-max">
        <Image src="/icon.svg" width="36em" height="36em" />
      </div>
      <div className="w-min h-min text-xl font-bold ml-2 pb-1 hidden md:block">
        CSCheckin
      </div>
    </div>
  );
}

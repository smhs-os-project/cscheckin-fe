import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="p-8 grid grid-col-1 md:grid-col-3 content-center items-center">
      <div className="col-start-1 col-end-1">
        <Image src="/icon.svg" width="36em" height="36em" />
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        {/* Your Content */}
      </div>
    </div>
  );
}

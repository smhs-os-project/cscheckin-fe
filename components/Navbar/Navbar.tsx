import React from "react";
import NavbarContent from "./NavbarContent";
import NavbarIcon from "./NavbarIcon";

export default function Navbar() {
  return (
    <div className="p-8 grid grid-col-1 md:grid-col-3 content-center items-center">
      <div className="col-start-1 col-end-1">
        <NavbarIcon />
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        <NavbarContent />
      </div>
    </div>
  );
}

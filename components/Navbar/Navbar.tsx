import React from "react";
import dynamic from "next/dynamic";
import useAuth from "../AuthStore/useAuth";

const ManageButton = dynamic(() => import("./ManageButton"));
const LogoButton = dynamic(() => import("./LogoButton"));
const BackButton = dynamic(() => import("./BackButton"));
const LogoutButton = dynamic(() => import("./LogoutButton"));
const SettingsButton = dynamic(() => import("./SettingsButton"));

export default function Navbar() {
  const { auth } = useAuth(false);

  return (
    <div className="grid items-center content-center p-8 grid-col-1 md:grid-col-3">
      <div className="flex content-center items-center col-start-1 col-end-1">
        <BackButton />
        <LogoButton />
      </div>
      <div className="col-start-3 col-end-3 space-x-2 justify-self-end">
        <ManageButton />
        <SettingsButton />
        <LogoutButton show={!!auth} />
      </div>
    </div>
  );
}

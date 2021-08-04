import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarContent, { NavbarContentVariant } from "./NavbarContent";
import NavbarIcon from "./NavbarIcon";

function useNavbarVariant() {
  const router = useRouter();
  const [variant, setVariant] = useState(NavbarContentVariant.NOT_LOGGED_IN);

  useEffect(() => {
    if (router && router.asPath === "/")
      setVariant(NavbarContentVariant.HOMEPAGE);
  }, [router]);

  return variant;
}

export default function Navbar() {
  const variant = useNavbarVariant();

  return (
    <div className="p-8 grid grid-col-1 md:grid-col-3 content-center items-center">
      <div className="col-start-1 col-end-1">
        <NavbarIcon />
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        <NavbarContent variant={variant} />
      </div>
    </div>
  );
}

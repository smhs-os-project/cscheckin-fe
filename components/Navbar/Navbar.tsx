import React, { useEffect, useState } from "react";
import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import useAuth from "../Database/AuthStore/useAuth";
import NavbarContent, { NavbarContentVariant } from "./NavbarContent";
import NavbarIcon from "./NavbarIcon";
import PrevIcon from "./PrevIcon";

function useNavbarVariant(router: NextRouter) {
  const { auth, pending } = useAuth();
  const [variant, setVariant] = useState<NavbarContentVariant>();

  useEffect(() => {
    if (router && router.isReady && !pending) {
      if (router.asPath === "/") {
        setVariant(NavbarContentVariant.HOMEPAGE);
      } else if (!router.asPath.startsWith("/sso") && auth) {
        setVariant(NavbarContentVariant.LOGGED_IN);
      } else {
        setVariant(NavbarContentVariant.NOT_LOGGED_IN);
      }
    }
  }, [auth, router, pending]);

  return variant;
}

function AutoPrevIcon({ router }: { router: NextRouter }) {
  const hidePrev = ["/", "/welcome"];

  return (
    <PrevIcon
      show={router && router.isReady && !hidePrev.includes(router.asPath)}
    />
  );
}

export default function Navbar() {
  const router = useRouter();
  const variant = useNavbarVariant(router);

  return (
    <div className="p-8 grid grid-col-1 md:grid-col-3 content-center items-center md:max-w-6xl mx-auto">
      <div className="col-start-1 col-end-1 flex space-x-2">
        <AutoPrevIcon router={router} />
        <NavbarIcon />
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        <NavbarContent variant={variant} />
      </div>
    </div>
  );
}

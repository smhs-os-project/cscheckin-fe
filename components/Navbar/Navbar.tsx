import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthStore from "../Database/AuthStore";
import NavbarContent, { NavbarContentVariant } from "./NavbarContent";
import NavbarIcon from "./NavbarIcon";
import PrevIcon from "./PrevIcon";

const authStore = AuthStore.getCommonInstance();

function useNavbarVariant() {
  const router = useRouter();
  const [variant, setVariant] = useState(NavbarContentVariant.NOT_LOGGED_IN);

  useEffect(() => {
    if (!router) return;
    if (router.asPath === "/") setVariant(NavbarContentVariant.HOMEPAGE);

    if (router.isReady && !router.asPath.startsWith("/sso")) {
      void authStore
        .getAuth()
        .then(() => {
          setVariant(NavbarContentVariant.LOGGED_IN);
        })
        .catch(() => router.push("/sso/teacher")); // redirect to login page
    }
  }, [router]);

  return variant;
}

function AutoPrevIcon() {
  const router = useRouter();
  const hidePrev = ["/", "/welcome"];

  return (
    <PrevIcon
      show={router && router.isReady && !hidePrev.includes(router.asPath)}
    />
  );
}

export default function Navbar() {
  const variant = useNavbarVariant();

  return (
    <div className="p-8 grid grid-col-1 md:grid-col-3 content-center items-center md:max-w-6xl mx-auto">
      <div className="col-start-1 col-end-1 flex space-x-2">
        <AutoPrevIcon />
        <NavbarIcon />
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        <NavbarContent variant={variant} />
      </div>
    </div>
  );
}

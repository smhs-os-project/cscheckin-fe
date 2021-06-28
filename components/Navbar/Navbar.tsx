import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "../BaseElements/BaseButton";
import AuthStore from "../AuthStore";
import useAuth from "../AuthStore/useAuth";

export default function Navbar() {
  const router = useRouter();
  const { auth } = useAuth(false);

  return (
    <div className="grid items-center content-center p-8 grid-col-1 md:grid-col-3">
      <div className="flex content-center items-center col-start-1 col-end-1">
        {router.pathname !== "/" && (
          <button
            type="button"
            className="h-full mr-5 focus:outline-none"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <button type="button" className="focus:outline-none">
          <Link href="/">
            <div className="flex content-center items-center">
              <div className="w-max h-max">
                <Image src="/icon.svg" width="36em" height="36em" />
              </div>
              <div className="w-min h-min text-xl font-bold ml-2 pb-1 hidden md:block">
                CSCheckin
              </div>
            </div>
          </Link>
        </button>
      </div>
      <div className="col-start-3 col-end-3 space-x-2 justify-self-end">
        <BaseButton solid onClick={async () => router.push("/checkin/manage")}>
          <span className="hidden md:inline">簽到連結</span>管理
        </BaseButton>
        <BaseButton onClick={async () => router.push("/config")}>
          設定
        </BaseButton>
        {auth && (
          <BaseButton
            solid
            className="hover:bg-red-600 transition-colors"
            onClick={() => {
              AuthStore.remove();
              window.location.href = "/";
            }}
          >
            登出
          </BaseButton>
        )}
      </div>
    </div>
  );
}

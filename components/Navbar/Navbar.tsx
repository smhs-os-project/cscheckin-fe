import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="grid items-center content-center p-8 grid-col-1 md:grid-col-3">
      <div className="flex items-center col-start-1 col-end-1">
        {router.pathname !== "/" && (
          <button
            type="button"
            className="h-full mr-5 focus:outline-none"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <button
          type="button"
          className="focus:outline-none"
          onClick={() => router.push("/")}
        >
          <Image src="/icon.svg" width="36em" height="36em" />
        </button>
        <p className="pb-1 text-2xl font-bold ml-2">CSCheckin</p>
      </div>
      <div className="col-start-3 col-end-3 justify-self-end">
        {/* Your Content */}
      </div>
    </div>
  );
}

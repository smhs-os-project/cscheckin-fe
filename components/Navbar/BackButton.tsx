import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  if (router.pathname !== "/") {
    return (
      <button
        type="button"
        className="h-full mr-5 focus:outline-none"
        onClick={() => router.back()}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  }

  return null;
}

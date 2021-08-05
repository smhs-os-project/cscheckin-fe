import React from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export interface PrevIconProps {
  show: boolean;
}

export default function PrevIcon({ show }: PrevIconProps) {
  const router = useRouter();

  if (show)
    return (
      <button
        type="button"
        className="rounded-lg hover:bg-secondary-hover p-4 transition-all duration-300"
        onClick={async () => router.back()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    );

  return null;
}

import React from "react";
import QRCode from "react-qr-code";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseInput from "../../../Elements/Input/BaseInput";

export interface CourseLinkBlockProps {
  link: string;
  onFullScreen?: () => void;
}

export default function CourseLinkBlock({
  link,
  onFullScreen,
}: CourseLinkBlockProps) {
  return (
    <>
      <section className="relative bg-on-surface flex flex-col sm:flex-row items-center p-8 rounded-xl">
        <button
          type="button"
          className="absolute top-4 right-4 hidden"
          onClick={() => onFullScreen && onFullScreen()}
        >
          <FontAwesomeIcon icon={faExpand} size="lg" />
        </button>
        <div className="w-lg">
          <QRCode size={144} value={link} />
        </div>
        <div className="overflow-hidden mt-4 sm:mt-0 text-center sm:text-left sm:ml-8">
          <p className="text-auxiliary">透過以下連結簽到</p>
          <BaseInput
            label="連結"
            paddingClass="px-6 py-2"
            className="font-header sm:text-h1 text-center sm:text-left bg-transparent py-2"
            value={link}
            readOnly
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </div>
      </section>
    </>
  );
}

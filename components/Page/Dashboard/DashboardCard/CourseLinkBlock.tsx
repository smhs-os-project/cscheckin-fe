import React from "react";
import QRCode from "react-qr-code";
import BaseInput from "../../../Elements/Input/BaseInput";

export interface CourseLinkBlockProps {
  link: string;
  onFullScreen?: () => void;
}

export default function CourseLinkBlock({ link }: CourseLinkBlockProps) {
  return (
    <section className="bg-on-surface flex flex-col sm:flex-row justify-between justify-center items-center p-8 sm:space-x-8 rounded-xl">
      <div className="mx-auto">
        <div className="block">
          <QRCode size={144} value={link} />
        </div>
      </div>
      <div className="overflow-hidden mt-4 sm:mt-0 text-center sm:text-left sm:ml-8">
        <p className="text-auxiliary">透過以下連結簽到</p>
        <BaseInput
          label="連結"
          className="font-header sm:text-h1 text-center sm:text-left bg-transparent"
          value={link}
          readOnly
          onFocus={(e) => {
            e.target.select();
          }}
        />
      </div>
    </section>
  );
}

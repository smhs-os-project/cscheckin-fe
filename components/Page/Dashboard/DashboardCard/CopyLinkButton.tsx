import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import FullWidthButton from "../../../Elements/Button/FullWidthButton";

export interface CopyLinkButtonProps {
  link: string;
}

export default function CopyLinkButton({ link }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard
      text={link}
      onCopy={(_, result) => {
        setCopied(result);

        // Hide the status text after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <FullWidthButton onClick={() => null} rightIcon>
        {copied ? "✅ 複製完成" : "複製連結"}
      </FullWidthButton>
    </CopyToClipboard>
  );
}

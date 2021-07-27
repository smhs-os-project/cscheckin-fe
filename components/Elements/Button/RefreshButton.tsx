import React from "react";
import BaseButton from "./BaseButton";

export default function RefreshButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <BaseButton
      className={className}
      solid
      onClick={() => {
        window.location.reload();
      }}
    >
      重新整理
    </BaseButton>
  );
}

RefreshButton.defaultProps = {
  className: "",
};

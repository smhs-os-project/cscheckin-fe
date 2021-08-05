import React from "react";

export interface NumberInputProps {
  backgroundColor?: string;
}

export default function NumberInput({
  backgroundColor = "bg-on-surface",
}: NumberInputProps) {
  return (
    <input
      type="number"
      className={`${backgroundColor} p-8 text-h2 font-mono`}
    />
  );
}

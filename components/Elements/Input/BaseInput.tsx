import React from "react";

export interface BaseInputsProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  backgroundColor?: string;
}

export default function BaseInput({
  label,
  value,
  onChange,
  backgroundColor = "bg-on-surface",
}: BaseInputsProps) {
  return (
    <input
      type="input"
      className={`px-6 py-4 ${backgroundColor} rounded-t-lg under-shadow tracking-button`}
      placeholder={label}
      onChange={(event) => onChange && onChange(event.target.value)}
      value={value}
    />
  );
}

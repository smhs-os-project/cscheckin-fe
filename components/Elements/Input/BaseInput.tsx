import React from "react";

export interface BaseInputsProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > {
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
  className,
  ...props
}: BaseInputsProps) {
  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type="input"
      className={`px-4 py-2 ${backgroundColor} rounded-t-lg under-shadow tracking-button ${className}`}
      placeholder={label}
      onChange={(event) => onChange && onChange(event.target.value)}
      value={value}
    />
  );
}

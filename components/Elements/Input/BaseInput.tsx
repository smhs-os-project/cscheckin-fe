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
  paddingClass?: string;
  backgroundColor?: string;
  roundClass?: string;
  shadowClass?: string;
  trackingClass?: string;
}

export default function BaseInput({
  label,
  value,
  onChange,
  paddingClass = "px-6 py-6",
  backgroundColor = "bg-on-surface",
  roundClass = "rounded-t-lg",
  shadowClass = "under-shadow",
  trackingClass = "tracking-button",
  className = "",
  ...props
}: BaseInputsProps) {
  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type="input"
      className={`${paddingClass} ${backgroundColor} ${roundClass} ${shadowClass} ${trackingClass} ${className}`}
      placeholder={label}
      onChange={(event) => onChange && onChange(event.target.value)}
      value={value}
    />
  );
}

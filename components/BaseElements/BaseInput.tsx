import React from "react";

export interface BaseInputsProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function BaseInput({
  id,
  label,
  value,
  onChange,
}: BaseInputsProps) {
  const partId = `${id}-part`;
  const inputId = `${id}-input`;
  const labelId = `${inputId}-label`;

  return (
    <div className={partId}>
      <label className={labelId} htmlFor={inputId}>
        <span className="mr-10" aria-label={label}>
          {label}
        </span>
        <input
          id="display-name-input"
          type="input"
          className="p-2 border-b border-gray-600 outline-none"
          onChange={(event) => onChange && onChange(event.target.value)}
          value={value}
        />
      </label>
    </div>
  );
}

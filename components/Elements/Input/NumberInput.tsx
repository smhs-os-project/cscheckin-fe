import React from "react";

export interface NumberInputProps {
  backgroundColor?: string;
  value?: number;
  onChange?: (value: number) => void;
}

export default function NumberInput({
  backgroundColor = "bg-on-surface",
  value,
  onChange = () => null,
}: NumberInputProps) {
  return (
    <>
      <input
        type="number"
        className={`${backgroundColor} px-6 py-4 text-h2 rounded-xl text-center appearance-none mx-4 font-button`}
        min={0}
        max={99}
        placeholder="0"
        value={value}
        // <input type="number"> is not able to input anything other than number.
        // We can safely convert the value.
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <style jsx scoped>
        {`
          /* https://stackoverflow.com/questions/13107118/how-to-remove-the-arrows-from-inputtype-number-in-opera */
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
          }
        `}
      </style>
    </>
  );
}

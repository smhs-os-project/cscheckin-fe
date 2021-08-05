import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

export interface Duration {
  /**
   * Hour
   */
  h: number;
  /**
   * Minute
   */
  m: number;
}

export interface DurationInputProps {
  value?: Duration;
  onChange?: (value: Duration) => void;
}

export default function DurationInput({
  value: receivedValue,
  onChange,
}: DurationInputProps) {
  const [value, setValue] = useState<Duration>(
    receivedValue || {
      h: 0,
      m: 0,
    }
  );

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  return (
    <div className="flex items-center">
      <NumberInput
        value={value.h}
        onChange={(hr) => setValue((prev) => ({ ...prev, h: hr }))}
      />
      <div>小時</div>
      <NumberInput
        value={value.m}
        onChange={(min) => setValue((prev) => ({ ...prev, m: min }))}
      />
      <div>分鐘</div>
    </div>
  );
}

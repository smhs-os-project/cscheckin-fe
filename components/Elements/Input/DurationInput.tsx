import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

export interface Duration {
  /**
   * Hour
   */
  h: number | null;
  /**
   * Minute
   */
  m: number | null;
}

export interface DurationInputProps {
  value?: Duration;
  onChange?: (value: Duration) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export default function DurationInput({
  value: receivedValue,
  onChange,
  prefix,
  suffix,
}: DurationInputProps) {
  const [value, setValue] = useState<Duration>(
    receivedValue || {
      h: null,
      m: null,
    }
  );

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-6">
        {prefix && <div>{prefix}</div>}
        <NumberInput
          value={value.h ?? undefined}
          onChange={(hr) => setValue((prev) => ({ ...prev, h: hr }))}
        />
        <div>小時</div>
        <NumberInput
          value={value.m ?? undefined}
          onChange={(min) => setValue((prev) => ({ ...prev, m: min }))}
        />
        <div>分鐘</div>
      </div>
      {suffix && <div>{suffix}</div>}
    </div>
  );
}

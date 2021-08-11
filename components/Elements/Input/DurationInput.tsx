import type { ReactNode } from "react";
import React from "react";
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
  value,
  onChange,
  prefix,
  suffix,
}: DurationInputProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-6">
        {prefix && <div>{prefix}</div>}
        <NumberInput
          value={value?.h ?? undefined}
          onChange={(hr) => onChange && onChange({ h: hr, m: value?.m ?? 0 })}
        />
        <div>小時</div>
        <NumberInput
          value={value?.m ?? undefined}
          onChange={(min) => onChange && onChange({ h: value?.h ?? 0, m: min })}
        />
        <div>分鐘</div>
      </div>
      {suffix && <div>{suffix}</div>}
    </div>
  );
}

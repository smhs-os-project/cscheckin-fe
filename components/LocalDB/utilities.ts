import { useEffect, useState } from "react";
import LocalDB from ".";

const localDB = LocalDB.getInstance();

/**
 * The config manager of a key.
 *
 * @param key The configuration key.
 * @returns [the value, the function to set the value]
 */
export function useConfig(
  key: string,
  defaultValue: string | null = null
): [string | null, (value: string) => void] {
  const [value, setValue] = useState<string | null>(null);
  const setter = (newValue: string) => {
    setValue(localDB.set(key, newValue).get(key) ?? defaultValue);
  };

  useEffect(() => {
    setValue(localDB.get(key) ?? defaultValue);

    window.addEventListener("storage", (ev) => {
      if (ev.key === key) setValue(ev.newValue ?? defaultValue);
    });
  }, []);

  return [value, setter];
}

export default {};

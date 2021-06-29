import { useEffect, useState } from "react";
import LocalDB from ".";

const localDB = LocalDB.getInstance();

/**
 * The config manager of a key.
 *
 * @param key The configuration key.
 * @returns [the value, the function to set the value, ready?]
 */
export function useConfig(
  key: string
): [string | null, (value: string) => void, boolean] {
  const [value, setValue] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const setter = (newValue: string) => {
    setValue(localDB.set(key, newValue).get(key));
  };

  useEffect(() => {
    setValue(localDB.get(key));

    window.addEventListener("storage", (ev) => {
      if (ev.key === key) setValue(ev.newValue);
    });

    setReady(true);
  }, [setValue, key]);

  return [value, setter, ready];
}

export default {};

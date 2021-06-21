import LocalDB from ".";

const localDB = LocalDB.getInstance();

/**
 * The config manager of a key.
 *
 * @param key The configuration key.
 * @returns [the value, the function to set the value]
 */
export function useConfig(
  key: string
): [string | null, (value: string) => void] {
  return [
    localDB.get(key),
    (value) => {
      localDB.set(key, value);
    },
  ];
}

export default {};

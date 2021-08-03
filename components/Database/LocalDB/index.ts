import CommonDB from "../CommonDB";

/**
 * Local database.
 *
 * In our practice, we prefer to separate the component with period (`.`).
 * For example:
 *
 * ```
 * setup.display-name
 * ```
 *
 * All keys gotten and set will be prefixed with "KEY_PREFIX", thus
 * the key that LocalDB will add to `localStorage` is:
 *
 * ```
 * [KEY_PREFIX].setup.display-name
 * // by default, it should be `inficast.setup.display-name`
 * ```
 */

export default class LocalDB extends CommonDB {
  private static instance: LocalDB | null = null;

  private constructor() {
    super();
    if (globalThis && globalThis.window && window.localStorage) {
      this.Storage = window.localStorage;
    }
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new LocalDB();
    }

    return this.instance;
  }
}

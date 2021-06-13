import CommonDB from "../CommonDB";

/**
 * Session database.
 *
 * @see LocalDB
 */
export default class SessionDB extends CommonDB {
  protected localStorage: Storage | null = null;

  private static instance: SessionDB | null = null;

  private constructor() {
    super();
    if (globalThis && globalThis.window && window.sessionStorage) {
      this.Storage = window.sessionStorage;
    }
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new SessionDB();
    }

    return this.instance;
  }
}

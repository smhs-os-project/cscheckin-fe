import CSCAuth from "cscheckin-js-sdk/dist/auth";
import SessionDB from "../SessionDB";
import { authKey } from "../SessionDB/consts";

const sessionDB = SessionDB.getInstance();

export default class AuthStore {
  private static auth: CSCAuth | null = null;

  static async store(auth: CSCAuth) {
    await auth.getAccessData();
    sessionDB.set(authKey, auth.export());
    this.auth = auth;
  }

  static async retrieve(): Promise<CSCAuth | null> {
    if (this.auth) return this.auth;

    const authData = sessionDB.get(authKey);
    if (authData) {
      const auth = CSCAuth.import(authData);
      if (auth) await this.store(auth);
      return auth;
    }

    return null;
  }

  static remove() {
    sessionDB.remove(authKey);
    this.auth = null;
  }
}

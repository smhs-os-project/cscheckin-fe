import CSCAuth from "cscheckin-js-sdk/dist/auth";
import SessionDB from "../SessionDB";
import { authKey } from "../SessionDB/consts";

const sessionDB = SessionDB.getInstance();

export default class AuthStore {
  private static auth: Record<string, CSCAuth> = {};

  static store(auth: CSCAuth, key = "default") {
    sessionDB.set(authKey, auth.export());
    this.auth[key] = auth;
  }

  static retrieve(key = "default"): CSCAuth | null {
    if (this.auth[key]) return this.auth[key] || null;

    const authData = sessionDB.get(authKey);
    if (authData) return CSCAuth.import(authData);

    return null;
  }
}

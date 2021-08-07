import CSCAuth from "cscheckin-js-sdk/dist/auth";
import SessionDB from "../SessionDB";
import CannotGetAuthHeader from "./exceptions/CannotGetAuthHeader";
import NotRestoreCredentialYet from "./exceptions/NotRestoreCredentialYet";

const AUTH_DATA_KEY = "auth.data";
const sessionDB = SessionDB.getInstance();

export default class AuthStore {
  private static instance: AuthStore | null = null;

  auth: CSCAuth | null = null;

  static getCommonInstance(): AuthStore {
    if (!this.instance) {
      this.instance = new AuthStore();
    }
    return this.instance;
  }

  storeCredential(tokenId: string, accessToken: string): void {
    this.auth = new CSCAuth(tokenId, accessToken);
  }

  async getBearerToken(): Promise<string> | never {
    if (!this.auth) throw new NotRestoreCredentialYet();

    const header = await this.auth.getAuthenticationHeader();
    if (!header) throw new CannotGetAuthHeader();

    return header;
  }

  save(): void {
    if (this.auth) sessionDB.set(AUTH_DATA_KEY, this.auth.export());
  }

  restore(): void {
    const auth = sessionDB.get(AUTH_DATA_KEY);
    if (auth) this.auth = CSCAuth.import(auth);
  }
}
